import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TrainingPlansModule } from './training-plans/training-plans.module';
import { PlanExercisesModule } from './plan-exercises/plan-exercises.module';
import { WorkoutSessionsModule } from './workout-sessions/workout-sessions.module';
import { ExecutedExercisesModule } from './executed-exercises/executed-exercises.module';
import { ExerciseSetsModule } from './exercise-sets/exercise-sets.module';
import { BodyMetricsModule } from './body-metrics/body-metrics.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TrainingPlansModule, PlanExercisesModule, WorkoutSessionsModule, ExecutedExercisesModule, ExerciseSetsModule, BodyMetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
