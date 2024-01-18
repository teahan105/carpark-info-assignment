import { Test, TestingModule } from '@nestjs/testing';
import { CarparkInfoService } from './carpark-info.service';

describe('CarparkInfoService', () => {
  let service: CarparkInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarparkInfoService],
    }).compile();

    service = module.get<CarparkInfoService>(CarparkInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
