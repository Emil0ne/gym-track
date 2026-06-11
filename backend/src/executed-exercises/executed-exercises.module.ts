import { Module } from '@nestjs/common';
import { ExecutedExercisesService } from './executed-exercises.service';
import { ExecutedExercisesController } from './executed-exercises.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExecutedExercisesController],
  providers: [ExecutedExercisesService],
})
export class ExecutedExercisesModule {}
