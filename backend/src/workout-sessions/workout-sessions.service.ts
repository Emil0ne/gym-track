import { Injectable } from '@nestjs/common';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkoutSessionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createWorkoutSessionDto: CreateWorkoutSessionDto,
  ) {
    return this.prisma.workoutSession.create({
      data: {
        userId: userId,
        name: createWorkoutSessionDto.name,
        planId: createWorkoutSessionDto.planId,
        duration: createWorkoutSessionDto.duration,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.workoutSession.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutSession`;
  }
  update(id: number, updateWorkoutSessionDto: UpdateWorkoutSessionDto) {
    return `This action updates a #${id} workoutSession`;
  }
  remove(id: number) {
    return `This action removes a #${id} workoutSession`;
  }
}
