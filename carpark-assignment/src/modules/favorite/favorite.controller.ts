import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';
import {
  FavoriteCarkparktDto,
  FavoriteCarkparktQueryDto,
} from './dto/favorite.dto';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('favorite-carpark')
  @Auth()
  addFavoriteCarpark(
    @GetCurrentUser('id') userId: number,
    @Body() body: FavoriteCarkparktDto,
  ) {
    return this.favoriteService.addFavoriteCarpark(userId, body.carparkNoId);
  }

  @Get('favorite-carpark')
  @Auth()
  getListFavoriteCarpark(
    @GetCurrentUser('id') userId: number,
    @Query() query: FavoriteCarkparktQueryDto,
  ) {
    return this.favoriteService.getFavoriteCarparkList(userId, query);
  }

  @Delete('favorite-carpark/:id')
  @Auth()
  deleteFavoriteCarpark(
    @GetCurrentUser('id') userId: number,
    @Query('id') id: number,
  ) {
    return this.favoriteService.deleteFavoriteCarpark(userId, id);
  }
}
