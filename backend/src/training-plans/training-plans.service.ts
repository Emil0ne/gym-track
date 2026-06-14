import { Injectable } from '@nestjs/common';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainingPlansService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTrainingPlanDto: CreateTrainingPlanDto) {
    const newPlan = await this.prisma.workoutPlan.create({
      data: {
        name: createTrainingPlanDto.name,
        description: createTrainingPlanDto.description,
        userId: userId,
      },
    });

    return newPlan;
  }

  async findAll(userId: string) {
    const userPlans = await this.prisma.workoutPlan.findMany({
      where: {
        userId: userId,
      },
      include: {
        exercises: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return userPlans;
  }

  async findOne(id: string, userId: string) {
    return this.prisma.workoutPlan.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        exercises: true,
      },
    });
  }

  update(id: string, updateTrainingPlanDto: UpdateTrainingPlanDto) {
    return `This action updates a #${id} trainingPlan`;
  }

  remove(id: string) {
    return `This action removes a #${id} trainingPlan`;
  }
}
