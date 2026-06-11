import { Test, TestingModule } from '@nestjs/testing';
import { ExecutedExercisesService } from './executed-exercises.service';

describe('ExecutedExercisesService', () => {
  let service: ExecutedExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutedExercisesService],
    }).compile();

    service = module.get<ExecutedExercisesService>(ExecutedExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
