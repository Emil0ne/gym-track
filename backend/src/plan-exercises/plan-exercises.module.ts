import { Module } from '@nestjs/common';
import { PlanExercisesService } from './plan-exercises.service';
import { PlanExercisesController } from './plan-exercises.controller';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], 
  controllers: [PlanExercisesController],
  providers: [PlanExercisesService],
})
export class PlanExercisesModule {}