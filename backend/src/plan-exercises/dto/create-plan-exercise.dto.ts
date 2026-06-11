export class CreatePlanExerciseDto {
  planId!: string;
  exerciseName!: string;
  targetSets!: number;
  targetReps!: string;
  restSeconds?: number;
}
