import { Test, TestingModule } from '@nestjs/testing';
import { PlanExercisesService } from './plan-exercises.service';

describe('PlanExercisesService', () => {
  let service: PlanExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanExercisesService],
    }).compile();

    service = module.get<PlanExercisesService>(PlanExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
