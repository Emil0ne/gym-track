import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async getAllExercises() {
    return this.prisma.exercise.findMany({
      orderBy: { nameEn: 'asc' },
    });
  }
}