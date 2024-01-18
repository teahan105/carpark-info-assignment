import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson';
import { join } from 'path';
import { FindOneOptions } from 'typeorm';
import { getSourceFile } from '../cron/cron.util';
import { ICarparkCsv2JsonData } from './carpark-info.interface';
import { CarparkInfoRepository } from './carpark-info.repository';
import {
  CarparkInfoTransformDataDto,
  GetListOfCarparkInfoDto,
  ListOfCarparkDataDto,
  ListOfCarparkResponseDto,
} from './dto/carpark-info.dto';
import { CarparkInfo } from './entities/carpark-info.entity';

@Injectable()
export class CarparkInfoService {
  constructor(private readonly carparkInfoRepository: CarparkInfoRepository) {}

  async getCarparkList(
    query: GetListOfCarparkInfoDto,
  ): Promise<ListOfCarparkResponseDto | []> {
    const [data, total] =
      await this.carparkInfoRepository.getCarparkList(query);

    if (!data.length) {
      return [];
    }

    const listOfCarparkInfo = data.map(
      (item) => new ListOfCarparkDataDto(item),
    );
    return new ListOfCarparkResponseDto(listOfCarparkInfo, total);
  }

  async initialize(): Promise<void> {
    const executeFile = getSourceFile();
    const filePath = join(__dirname, '../../../', 'source/', executeFile);
    const jsonData = await this.readDataFromFile(filePath);
    const transformData = this.mapJsonDataToTransformData(jsonData);
    await this.carparkInfoRepository.initialize(transformData);
  }

  async syncDatabase(rawData: ICarparkCsv2JsonData[]): Promise<void> {
    const transformData = this.mapJsonDataToTransformData(rawData);
    await this.carparkInfoRepository.syncDatabase(transformData);
  }

  findOneWithOptions(
    optionsQuery: FindOneOptions<CarparkInfo>,
  ): Promise<CarparkInfo | undefined> {
    return this.carparkInfoRepository.getRepository().findOne(optionsQuery);
  }

  private async readDataFromFile(
    filePath: string,
  ): Promise<ICarparkCsv2JsonData[]> {
    return csv().fromFile(filePath) as unknown as ICarparkCsv2JsonData[];
  }

  private mapJsonDataToTransformData(
    jsonData: ICarparkCsv2JsonData[],
  ): CarparkInfoTransformDataDto[] {
    return jsonData.map((record) => {
      const {
        car_park_no,
        address,
        x_coord,
        y_coord,
        car_park_type,
        type_of_parking_system,
        short_term_parking,
        free_parking,
        night_parking,
        car_park_basement,
        car_park_decks,
        gantry_height,
      } = record;

      return {
        carParkNo: car_park_no,
        address: address,
        xCoord: +x_coord || 0.0,
        yCoord: +y_coord || 0.0,
        carParkType: car_park_type,
        typeOfParkingSystem: type_of_parking_system,
        shortTermParking: short_term_parking,
        freeParking: free_parking,
        nightParking: night_parking,
        carParkDecks: +car_park_decks || 0,
        gantryHeight: +gantry_height || 0,
        carParkBasement: car_park_basement,
      };
    });
  }
}
