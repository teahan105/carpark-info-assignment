import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { LoggerModule } from 'nestjs-pino';
import { AnyExceptionFilter } from 'src/filters/any-exception.filter';
import { loggerConfig } from 'src/shared/logger.helper';
import { AuthModule } from '../auth/auth.module';
import { CarparkInfoModule } from '../carpark-info/carpark-info.module';
import { ConfigModule } from '../config/config.module';
import { CONFIG } from '../config/config.provider';
import { CronModule } from '../cron/cron.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { UserModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [CONFIG],
      useFactory: (config: IConfig) =>
        loggerConfig(process.env.NODE_ENV, config.get('logger.autoLogging')),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [CONFIG],
      useFactory: async () => {
        return {
          type: 'sqlite',
          database: ':memory:',
          logging: true,
          entities: ['dist/modules/*/entities/*.entity.js'],
          synchronize: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    CronModule,
    ScheduleModule.forRoot(),
    CarparkInfoModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
