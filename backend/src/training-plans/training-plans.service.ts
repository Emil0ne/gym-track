import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainingPlansService {
  constructor(private prisma: PrismaService) {}

  // 1. Pobieranie wszystkich planów użytkownika wraz z ćwiczeniami
  async getUserPlans(userId: string) {
    return this.prisma.workoutPlan.findMany({
      where: { userId },
      include: {
        exercises: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 2. Tworzenie nowego planu od zera
  async createPlan(userId: string, data: any) {
    return this.prisma.workoutPlan.create({
      data: {
        userId,
        name: data.planName,
        exercises: {
          create: data.days.flatMap((day: any) =>
            day.exercises.map((ex: any) => ({
              dayName: day.name,
              exerciseName: ex.nameEn,
              targetSets: ex.sets,
              targetReps: ex.reps,
              restSeconds: ex.rest,
            }))
          ),
        },
      },
      include: { exercises: true },
    });
  }

  async updatePlan(planId: string, userId: string, data: any) {
    const plan = await this.prisma.workoutPlan.findFirst({
      where: { id: planId, userId },
    });

    if (!plan) throw new NotFoundException('Plan treningowy nie został znaleziony');

    return this.prisma.$transaction(async (tx) => {
      await tx.workoutPlan.update({
        where: { id: planId },
        data: { name: data.planName },
      });

      await tx.planExercise.deleteMany({
        where: { planId },
      });

      await tx.planExercise.createMany({
        data: data.days.flatMap((day: any) =>
          day.exercises.map((ex: any) => ({
            planId,
            dayName: day.name,
            exerciseName: ex.nameEn,
            targetSets: ex.sets,
            targetReps: ex.reps,
            restSeconds: ex.rest,
          }))
        ),
      });

      return tx.workoutPlan.findUnique({
        where: { id: planId },
        include: { exercises: true },
      });
    });
  }

  async deletePlan(planId: string, userId: string) {
    const plan = await this.prisma.workoutPlan.findFirst({
      where: { id: planId, userId },
    });

    if (!plan) throw new NotFoundException('Plan treningowy nie został znaleziony');

    await this.prisma.workoutPlan.delete({
      where: { id: planId },
    });

    return { success: true };
  }
}