import { Test, TestingModule } from '@nestjs/testing';
import { SorenessService } from './soreness.service';

describe('SorenessService', () => {
  let service: SorenessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorenessService],
    }).compile();

    service = module.get<SorenessService>(SorenessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
