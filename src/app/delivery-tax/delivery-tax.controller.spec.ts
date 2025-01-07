import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryTaxController } from './delivery-tax.controller';

describe('DeliveryTaxController', () => {
  let controller: DeliveryTaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryTaxController],
    }).compile();

    controller = module.get<DeliveryTaxController>(DeliveryTaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
