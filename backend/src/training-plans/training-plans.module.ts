import { Module } from '@nestjs/common';
import { TrainingPlansController } from './training-plans.controller';
import { TrainingPlansService } from './training-plans.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TrainingPlansController],
  providers: [TrainingPlansService, PrismaService],
})
export class TrainingPlansModule {}
