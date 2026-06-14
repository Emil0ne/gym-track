import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OnboardingDto } from './dto/onboarding.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async completeOnboarding(userId: string, data: OnboardingDto) {
    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { height: data.height },
      });

      await tx.bodyMetricLog.create({
        data: {
          userId,
          weight: data.weight,
        },
      });

      const plan = await tx.workoutPlan.create({
        data: {
          userId,
          name: data.planName,
          exercises: {
            create: data.days.flatMap((day) =>
              day.exercises.map((ex) => ({
                dayName: day.name,
                exerciseName: ex.nameEn,
                targetSets: ex.sets,
                targetReps: ex.reps,
                restSeconds: ex.rest,
              })),
            ),
          },
        },
      });

      return { success: true, planId: plan.id };
    });
  }

  async getUserProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        workoutPlans: true,
        weightLogs: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }
}
