import { Module } from '@nestjs/common';
import { ExerciseSetsService } from './exercise-sets.service';
import { ExerciseSetsController } from './exercise-sets.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExerciseSetsController],
  providers: [ExerciseSetsService],
})
export class ExerciseSetsModule {}
