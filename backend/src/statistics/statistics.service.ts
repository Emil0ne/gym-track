import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getExerciseMax(userId: string, exerciseName: string) {
    return this.prisma.exerciseSet.findMany({
      where: {
        executedExercise: {
          session: { userId: userId },
          exerciseName: exerciseName,
        },
      },
      orderBy: { weight: 'desc' },
      take: 1,
    });
  }
}
