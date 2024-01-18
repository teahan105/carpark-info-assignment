import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteModule } from '../favorite/favorite.module';
import { CarparkInfoController } from './carpark-info.controller';
import { CarparkInfoRepository } from './carpark-info.repository';
import { CarparkInfoService } from './carpark-info.service';
import { CarparkInfo } from './entities/carpark-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarparkInfo]),
    forwardRef(() => FavoriteModule),
  ],
  providers: [CarparkInfoService, CarparkInfoRepository],
  controllers: [CarparkInfoController],
  exports: [CarparkInfoService, CarparkInfoRepository],
})
export class CarparkInfoModule {}
