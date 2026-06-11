import { Test, TestingModule } from '@nestjs/testing';
import { ExecutedExercisesController } from './executed-exercises.controller';
import { ExecutedExercisesService } from './executed-exercises.service';

describe('ExecutedExercisesController', () => {
  let controller: ExecutedExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutedExercisesController],
      providers: [ExecutedExercisesService],
    }).compile();

    controller = module.get<ExecutedExercisesController>(ExecutedExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
