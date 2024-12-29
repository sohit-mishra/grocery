import { Test, TestingModule } from '@nestjs/testing';
import { ProductOutOfStockService } from './product-out-of-stock.service';

describe('ProductOutOfStockService', () => {
  let service: ProductOutOfStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductOutOfStockService],
    }).compile();

    service = module.get<ProductOutOfStockService>(ProductOutOfStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
