import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from '../auth/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('max')
  async getMax(@Request() req, @Query('exerciseName') exerciseName: string) {
    const userId = req.user.sub;
    return this.statisticsService.getExerciseMax(userId, exerciseName);
  }
}