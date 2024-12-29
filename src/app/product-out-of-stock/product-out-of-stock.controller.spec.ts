import { Test, TestingModule } from '@nestjs/testing';
import { ProductOutOfStockController } from './product-out-of-stock.controller';

describe('ProductOutOfStockController', () => {
  let controller: ProductOutOfStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductOutOfStockController],
    }).compile();

    controller = module.get<ProductOutOfStockController>(ProductOutOfStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
