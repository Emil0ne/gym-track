import { Injectable } from '@nestjs/common';
import { CreateExerciseSetDto } from './dto/create-exercise-set.dto';
import { UpdateExerciseSetDto } from './dto/update-exercise-set.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExerciseSetsService {
  constructor(private prisma: PrismaService) {}

  async create(createExerciseSetDto: CreateExerciseSetDto) {
    return this.prisma.exerciseSet.create({
      data: {
        executedExerciseId: createExerciseSetDto.executedExerciseId,
        setNumber: createExerciseSetDto.setNumber,
        weight: createExerciseSetDto.weight,
        reps: createExerciseSetDto.reps,
        isCompleted: createExerciseSetDto.isCompleted ?? true,
      },
    });
  }

  findAll() {
    return `This action returns all exerciseSets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseSet`;
  }

  update(id: number, updateExerciseSetDto: UpdateExerciseSetDto) {
    return `This action updates a #${id} exerciseSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseSet`;
  }
}
