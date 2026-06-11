import { Test, TestingModule } from '@nestjs/testing';
import { PlanExercisesController } from './plan-exercises.controller';
import { PlanExercisesService } from './plan-exercises.service';

describe('PlanExercisesController', () => {
  let controller: PlanExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanExercisesController],
      providers: [PlanExercisesService],
    }).compile();

    controller = module.get<PlanExercisesController>(PlanExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
