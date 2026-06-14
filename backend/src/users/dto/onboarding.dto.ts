export class OnboardingDto {
  weight!: number;
  height!: number;
  planName!: string;
  days!: {
    id: string;
    name: string;
    exercises: {
      id: string;
      nameEn: string;
      sets: number;
      reps: string;
      rest: number;
    }[];
  }[];
}
