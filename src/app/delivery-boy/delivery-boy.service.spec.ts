import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryBoyService } from './delivery-boy.service';

describe('DeliveryBoyService', () => {
  let service: DeliveryBoyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryBoyService],
    }).compile();

    service = module.get<DeliveryBoyService>(DeliveryBoyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
