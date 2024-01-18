import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { CarparkInfoService } from './carpark-info.service';
import {
  GetListOfCarparkInfoDto,
  ListOfCarparkResponseDto,
} from './dto/carpark-info.dto';

@ApiTags('Carkpark')
@Controller('carpark-info')
export class CarparkInfoController {
  constructor(private readonly carparkInfoService: CarparkInfoService) {}

  @Get()
  @Auth()
  @ApiOkResponse({ type: ListOfCarparkResponseDto })
  getCarparkList(@Query() query: GetListOfCarparkInfoDto) {
    return this.carparkInfoService.getCarparkList(query);
  }
}
