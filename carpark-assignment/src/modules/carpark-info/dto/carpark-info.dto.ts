import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { toNumber } from 'src/shared/transform';
import { CarparkInfo } from '../entities/carpark-info.entity';

export class CarparkInfoTransformDataDto {
  @ApiProperty()
  carParkNo: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  xCoord: number;

  @ApiProperty()
  yCoord: number;

  @ApiProperty()
  carParkType: string;

  @ApiProperty()
  typeOfParkingSystem: string;

  @ApiProperty()
  shortTermParking: string;

  @ApiProperty()
  freeParking: string;

  @ApiProperty()
  nightParking: string;

  @ApiProperty()
  carParkDecks: number;

  @ApiProperty()
  gantryHeight: number;

  @ApiProperty()
  carParkBasement: string;
}

export enum CarparkInfoOptions {
  YES = 'YES',
  NO = 'NO',
}

export class GetListOfCarparkInfoDto {
  @ApiProperty({ required: false, enum: CarparkInfoOptions })
  @IsEnum(CarparkInfoOptions)
  @IsString()
  @IsOptional()
  freeParking: string;

  @ApiProperty({ required: false, enum: CarparkInfoOptions })
  @IsEnum(CarparkInfoOptions)
  @IsString()
  @IsOptional()
  nightParking: string;

  @ApiProperty({ required: false })
  @Transform(({ key, value }) => toNumber(key, value))
  @IsNumber()
  @IsOptional()
  vehicleHeightRequirement: number;

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

@Exclude()
export class ListOfCarparkDataDto {
  @ApiProperty()
  @Expose()
  carParkNo: string;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  xCoord: number;

  @ApiProperty()
  @Expose()
  yCoord: number;

  @ApiProperty()
  @Expose()
  carParkType: string;

  @ApiProperty()
  @Expose()
  typeOfParkingSystem: string;

  @ApiProperty()
  @Expose()
  shortTermParking: string;

  @ApiProperty()
  @Expose()
  nightParking: string;

  @ApiProperty()
  @Expose()
  carParkDecks: number;

  @ApiProperty()
  @Expose()
  freeParking: string;

  @ApiProperty()
  @Expose()
  gantryHeight: number;

  @ApiProperty()
  @Expose()
  carParkBasement: string;

  constructor(partial: Partial<CarparkInfo>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ListOfCarparkResponseDto {
  @ApiProperty({ type: [ListOfCarparkDataDto] })
  @Expose()
  @Type(() => ListOfCarparkDataDto)
  data: ListOfCarparkDataDto[];

  @ApiProperty()
  @Expose()
  total: number;

  constructor(data: ListOfCarparkDataDto[], total: number) {
    this.data = data;
    this.total = total;
  }
}
