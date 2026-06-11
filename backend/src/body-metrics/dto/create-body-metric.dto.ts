import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateBodyMetricDto {
  @IsNumber()
  @Min(30)
  @Max(250)
  weight!: number;

  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(200)
  chest?: number;

  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(150)
  waist?: number;

  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(70)
  biceps?: number;
}