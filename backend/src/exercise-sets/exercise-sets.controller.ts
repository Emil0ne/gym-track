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
import { ExerciseSetsService } from './exercise-sets.service';
import { CreateExerciseSetDto } from './dto/create-exercise-set.dto';
import { UpdateExerciseSetDto } from './dto/update-exercise-set.dto';
import { AuthGuard } from '../auth/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('exercise-sets')
export class ExerciseSetsController {
  constructor(private readonly exerciseSetsService: ExerciseSetsService) {}

  @Post()
  create(@Body() createExerciseSetDto: CreateExerciseSetDto) {
    return this.exerciseSetsService.create(createExerciseSetDto);
  }

  @Get()
  findAll() {
    return this.exerciseSetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseSetsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseSetDto: UpdateExerciseSetDto,
  ) {
    return this.exerciseSetsService.update(+id, updateExerciseSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseSetsService.remove(+id);
  }
}
