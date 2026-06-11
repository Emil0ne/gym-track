import { PartialType } from '@nestjs/mapped-types';
import { CreateExecutedExerciseDto } from './create-executed-exercise.dto';

export class UpdateExecutedExerciseDto extends PartialType(CreateExecutedExerciseDto) {}
