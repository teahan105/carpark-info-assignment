import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chunk } from 'lodash';
import { DEFAULT_LIMIT } from 'src/constants/constants';
import { Brackets, DataSource, Repository } from 'typeorm';
import {
  CarparkInfoOptions,
  CarparkInfoTransformDataDto,
  GetListOfCarparkInfoDto,
} from './dto/carpark-info.dto';
import { CarparkInfo } from './entities/carpark-info.entity';

@Injectable()
export class CarparkInfoRepository {
  private logger = new Logger(CarparkInfoRepository.name);
  private alias: string = 'carpark-info';

  constructor(
    private dataSource: DataSource,
    @InjectRepository(CarparkInfo)
    private readonly carparkInfoRepository: Repository<CarparkInfo>,
  ) {}

  getRepository() {
    return this.carparkInfoRepository;
  }

  async syncDatabase(data: CarparkInfoTransformDataDto[]) {
    this.logger.log('=== Start Synchronize Database ===');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const carparkInfoData = data.map(
      (element) =>
        queryRunner.manager.create(CarparkInfo, element) as CarparkInfo,
    );

    await this.performDatabaseTransaction(
      queryRunner,
      carparkInfoData,
      'upsert',
    );
  }

  async initialize(data: CarparkInfoTransformDataDto[]) {
    this.logger.log('=== Start Initiate Database ===');
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const carparkInfoData = data.map(
      (element) =>
        queryRunner.manager.create(CarparkInfo, element) as CarparkInfo,
    );

    await this.performDatabaseTransaction(queryRunner, carparkInfoData, 'save');
  }

  getCarparkList(query: GetListOfCarparkInfoDto) {
    const { page = 1, limit = DEFAULT_LIMIT } = query;
    const queryBuilder = this.buildCarparkInfoQueryBuilder(query);

    if (page) {
      queryBuilder.skip((page - 1) * (limit || 10));
    }
    if (limit) {
      queryBuilder.take(limit);
    }

    return queryBuilder.getManyAndCount();
  }

  private buildCarparkInfoQueryBuilder(query: GetListOfCarparkInfoDto) {
    const { freeParking, nightParking, vehicleHeightRequirement } = query;
    const queryBuilder = this.carparkInfoRepository.createQueryBuilder(
      this.alias,
    );

    queryBuilder.where(`${this.alias}.carParkNo IS NOT NULL`);

    if (freeParking) {
      queryBuilder.andWhere(
        `${this.alias}.freeParking ${freeParking === CarparkInfoOptions.YES ? '!=' : '='} 'NO'`,
      );
    }
    if (nightParking) {
      queryBuilder.andWhere(`${this.alias}.nightParking = :nightParkingQuery`, {
        nightParkingQuery: nightParking,
      });
    }
    if (vehicleHeightRequirement) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(`${this.alias}.gantryHeight = 0`).orWhere(
            `${this.alias}.gantryHeight >= :heightRequirement`,
            {
              heightRequirement: vehicleHeightRequirement,
            },
          );
        }),
      );
    }

    return queryBuilder;
  }

  private async performDatabaseTransaction(queryRunner, data, operation) {
    await queryRunner.startTransaction();
    try {
      for (const chunkItem of chunk(data, 50)) {
        await queryRunner.manager[operation](CarparkInfo, chunkItem, {
          conflictPaths: ['carParkNo'],
          upsertType: 'on-conflict-do-update',
        });
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      const operationName = operation === 'upsert' ? 'sync' : 'initiate';
      this.logger.error(`Error when ${operationName} db: `, error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
