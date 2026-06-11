import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseSetsService } from './exercise-sets.service';

describe('ExerciseSetsService', () => {
  let service: ExerciseSetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseSetsService],
    }).compile();

    service = module.get<ExerciseSetsService>(ExerciseSetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
