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
import { ExecutedExercisesService } from './executed-exercises.service';
import { CreateExecutedExerciseDto } from './dto/create-executed-exercise.dto';
import { UpdateExecutedExerciseDto } from './dto/update-executed-exercise.dto';
import { AuthGuard } from '../auth/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('executed-exercises')
export class ExecutedExercisesController {
  constructor(
    private readonly executedExercisesService: ExecutedExercisesService,
  ) {}

  @Post()
  create(@Body() createExecutedExerciseDto: CreateExecutedExerciseDto) {
    return this.executedExercisesService.create(createExecutedExerciseDto);
  }

  @Get()
  findAll() {
    return this.executedExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.executedExercisesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExecutedExerciseDto: UpdateExecutedExerciseDto,
  ) {
    return this.executedExercisesService.update(+id, updateExecutedExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.executedExercisesService.remove(+id);
  }
}
