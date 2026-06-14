import { Injectable } from '@nestjs/common';
import { CreateExecutedExerciseDto } from './dto/create-executed-exercise.dto';
import { UpdateExecutedExerciseDto } from './dto/update-executed-exercise.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExecutedExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(createExecutedExerciseDto: CreateExecutedExerciseDto) {
    return this.prisma.executedExercise.create({
      data: {
        sessionId: createExecutedExerciseDto.sessionId,
        exerciseName: createExecutedExerciseDto.exerciseName,
      },
    });
  }

  findAll() {
    return `This action returns all executedExercises`;
  }

  findOne(id: string) {
    return `This action returns a #${id} executedExercise`;
  }

  update(id: string, updateExecutedExerciseDto: UpdateExecutedExerciseDto) {
    return `This action updates a #${id} executedExercise`;
  }

  remove(id: string) {
    return `This action removes a #${id} executedExercise`;
  }
}
