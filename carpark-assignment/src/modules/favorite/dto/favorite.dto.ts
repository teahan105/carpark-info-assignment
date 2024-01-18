import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { toNumber } from 'src/shared/transform';

export class FavoriteCarkparktDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  carparkNoId: string;
}

export class FavoriteCarkparktQueryDto {
  @ApiProperty({ required: false })
  @Transform(({ key, value }) => toNumber(key, value))
  @Min(1)
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false })
  @Transform(({ key, value }) => toNumber(key, value))
  @Max(100)
  @Min(1)
  @IsNumber()
  @IsOptional()
  limit: number;
}
