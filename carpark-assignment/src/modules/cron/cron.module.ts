import { Module } from '@nestjs/common';
import { CarparkInfoModule } from '../carpark-info/carpark-info.module';
import { CronService } from './cron.service';

@Module({
  imports: [CarparkInfoModule],
  providers: [CronService],
})
export class CronModule {}
