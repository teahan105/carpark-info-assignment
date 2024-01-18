import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarparkInfoModule } from '../carpark-info/carpark-info.module';
import { UserModule } from '../users/users.module';
import { Favorite } from './entities/favorite.entity';
import { FavoriteController } from './favorite.controller';
import { FavoriteRepository } from './favorite.repository';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    forwardRef(() => CarparkInfoModule),
    UserModule,
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteRepository],
})
export class FavoriteModule {}
