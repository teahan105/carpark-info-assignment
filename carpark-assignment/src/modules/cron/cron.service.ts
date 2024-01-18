import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import * as csv from 'csvtojson';
import { join } from 'path';
import { ICarparkCsv2JsonData } from '../carpark-info/carpark-info.interface';
import { CarparkInfoService } from '../carpark-info/carpark-info.service';
import { getSourceFile } from './cron.util';

@Injectable()
export class CronService {
  private logger = new Logger(CronService.name);

  constructor(private readonly carparkInfoService: CarparkInfoService) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async syncDatabaseFromDailyFile() {
    this.logger.log('Cronjob starting');
    const filePath = this.getFilePath();
    const jsonData = await this.readDataFromFile(filePath);
    await this.carparkInfoService.syncDatabase(jsonData);
    this.logger.log('Cronjob completed successfully');
  }

  private getFilePath(): string {
    return join(__dirname, '../../../', 'source/', getSourceFile());
  }

  private async readDataFromFile(
    filePath: string,
  ): Promise<ICarparkCsv2JsonData[]> {
    return csv().fromFile(filePath) as unknown as ICarparkCsv2JsonData[];
  }
}
