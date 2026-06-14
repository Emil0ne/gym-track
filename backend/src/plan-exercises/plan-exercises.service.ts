import { Injectable } from '@nestjs/common';
import { CreatePlanExerciseDto } from './dto/create-plan-exercise.dto';
import { UpdatePlanExerciseDto } from './dto/update-plan-exercise.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlanExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(createPlanExerciseDto: CreatePlanExerciseDto) {
    return this.prisma.planExercise.create({
      data: {
        planId: createPlanExerciseDto.planId,
        exerciseName: createPlanExerciseDto.exerciseName,
        targetSets: createPlanExerciseDto.targetSets,
        targetReps: createPlanExerciseDto.targetReps,
        restSeconds: createPlanExerciseDto.restSeconds,
      },
    });
  }

  findAll() { return `This action returns all planExercises`; }
  findOne(id: string) { return `This action returns a #${id} planExercise`; }
  update(id: string, updatePlanExerciseDto: UpdatePlanExerciseDto) { return `This action updates a #${id} planExercise`; }
  remove(id: string) { return `This action removes a #${id} planExercise`; }
}