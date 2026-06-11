export class CreateExerciseSetDto {
  executedExerciseId!: string;
  setNumber!: number;
  weight!: number;
  reps!: number;
  isCompleted?: boolean;
}
