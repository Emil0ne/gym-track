import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WorkoutSessionsService } from './workout-sessions.service';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { AuthGuard } from '../auth/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('workout-sessions')
export class WorkoutSessionsController {
  constructor(
    private readonly workoutSessionsService: WorkoutSessionsService,
  ) {}

  @Post()
  create(
    @Request() req,
    @Body() createWorkoutSessionDto: CreateWorkoutSessionDto,
  ) {
    const userId = req.user.sub;
    return this.workoutSessionsService.create(userId, createWorkoutSessionDto);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.sub;
    return this.workoutSessionsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkoutSessionDto: UpdateWorkoutSessionDto,
  ) {
    return this.workoutSessionsService.update(+id, updateWorkoutSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutSessionsService.remove(+id);
  }
}
