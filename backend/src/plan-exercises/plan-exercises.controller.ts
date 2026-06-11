import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlanExercisesService } from './plan-exercises.service';
import { CreatePlanExerciseDto } from './dto/create-plan-exercise.dto';
import { UpdatePlanExerciseDto } from './dto/update-plan-exercise.dto';
import { AuthGuard } from '../auth/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('plan-exercises')
export class PlanExercisesController {
  constructor(private readonly planExercisesService: PlanExercisesService) {}

  @Post()
  create(@Body() createPlanExerciseDto: CreatePlanExerciseDto) {
    return this.planExercisesService.create(createPlanExerciseDto);
  }

  @Get()
  findAll() {
    return this.planExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planExercisesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanExerciseDto: UpdatePlanExerciseDto,
  ) {
    return this.planExercisesService.update(+id, updatePlanExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planExercisesService.remove(+id);
  }
}
