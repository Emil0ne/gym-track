import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseSetsController } from './exercise-sets.controller';
import { ExerciseSetsService } from './exercise-sets.service';

describe('ExerciseSetsController', () => {
  let controller: ExerciseSetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseSetsController],
      providers: [ExerciseSetsService],
    }).compile();

    controller = module.get<ExerciseSetsController>(ExerciseSetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
