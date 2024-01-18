import { Test, TestingModule } from '@nestjs/testing';
import { CarparkInfoController } from './carpark-info.controller';
import { CarparkInfoService } from './carpark-info.service';

describe('CarparkInfoController', () => {
  let controller: CarparkInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarparkInfoController],
      providers: [CarparkInfoService],
    }).compile();

    controller = module.get<CarparkInfoController>(CarparkInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
