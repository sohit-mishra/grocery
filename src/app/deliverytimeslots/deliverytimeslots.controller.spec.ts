import { Test, TestingModule } from '@nestjs/testing';
import { DeliverytimeslotsController } from './deliverytimeslots.controller';

describe('DeliverytimeslotsController', () => {
  let controller: DeliverytimeslotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverytimeslotsController],
    }).compile();

    controller = module.get<DeliverytimeslotsController>(DeliverytimeslotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
