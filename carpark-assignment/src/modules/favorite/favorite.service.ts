import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DEFAULT_LIMIT } from 'src/constants/constants';
import { Errors } from 'src/constants/errors';
import { CarparkInfoService } from '../carpark-info/carpark-info.service';
import { UsersService } from '../users/users.service';
import { FavoriteCarkparktQueryDto } from './dto/favorite.dto';
import { IFavorite } from './favorite.interface';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly carparkInfoService: CarparkInfoService,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly userService: UsersService,
  ) {}

  async addFavoriteCarpark(userId: number, carparkNoId: string) {
    const user = await this.userService.getUser(userId);
    if (!user) throw new UnauthorizedException(Errors.UNAUTHORIZED);

    const carparkInfo = await this.carparkInfoService.findOneWithOptions({
      where: {
        carParkNo: carparkNoId,
      },
    });
    if (!carparkInfo) throw new NotFoundException(Errors.CARKPARK_NOT_FOUND);

    const existFavoriteCarpark = await this.favoriteRepository
      .getRepository()
      .findOne({
        where: {
          userId: userId,
          carParkNoId: carparkNoId,
        },
      });
    if (existFavoriteCarpark) {
      throw new BadRequestException(Errors.CARPARK_EXISTED);
    }

    const data: IFavorite = {
      userId: userId,
      carParkNoId: carparkNoId,
    };
    const newFavoriteCarpark = await this.favoriteRepository
      .getRepository()
      .save(data);
    return newFavoriteCarpark;
  }

  async getFavoriteCarparkList(
    userId: number,
    query: FavoriteCarkparktQueryDto,
  ) {
    const { page = 1, limit = DEFAULT_LIMIT } = query;
    const user = await this.favoriteRepository.getRepository().findOne({
      where: {
        id: userId,
      },
    });
    if (!user) throw new UnauthorizedException(Errors.UNAUTHORIZED);

    const [data, total] = await this.favoriteRepository.getFavoriteCarparkList(
      userId,
      page,
      limit,
    );
    return { data, total };
  }

  async deleteFavoriteCarpark(userId: number, favoriteId: number) {
    const existFavoriteCarpark = await this.favoriteRepository
      .getRepository()
      .findOne({
        where: {
          id: favoriteId,
          userId: userId,
        },
      });
    if (!existFavoriteCarpark)
      throw new NotFoundException(Errors.CARKPARK_NOT_FOUND);

    return this.favoriteRepository.getRepository().remove(existFavoriteCarpark);
  }
}
