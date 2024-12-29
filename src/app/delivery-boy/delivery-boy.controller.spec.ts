import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryBoyController } from './delivery-boy.controller';

describe('DeliveryBoyController', () => {
  let controller: DeliveryBoyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryBoyController],
    }).compile();

    controller = module.get<DeliveryBoyController>(DeliveryBoyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
