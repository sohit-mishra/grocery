import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryTaxService } from './delivery-tax.service';

describe('DeliveryTaxService', () => {
  let service: DeliveryTaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryTaxService],
    }).compile();

    service = module.get<DeliveryTaxService>(DeliveryTaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
