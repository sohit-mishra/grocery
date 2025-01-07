import { Test, TestingModule } from '@nestjs/testing';
import { DeliverytimeslotsService } from './deliverytimeslots.service';

describe('DeliverytimeslotsService', () => {
  let service: DeliverytimeslotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliverytimeslotsService],
    }).compile();

    service = module.get<DeliverytimeslotsService>(DeliverytimeslotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
