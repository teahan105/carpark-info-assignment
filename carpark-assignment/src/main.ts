import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { CarparkInfoService } from 'src/modules/carpark-info/carpark-info.service';
import { AppModule } from './modules/app/app.module';
import { CONFIG, getHost } from './modules/config/config.provider';

const validationPipeOptions = {
  transform: true,
  validationError: {
    target: false,
    value: false,
  },
  whitelist: true,
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(CONFIG);

  app
    .use(
      helmet({
        contentSecurityPolicy: false,
      }),
    )
    .enableCors();

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(configService.get('service.baseUrl'));
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  const carparkInfoService = app.get(CarparkInfoService);
  await carparkInfoService.initialize();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Carpark Info')
    .setDescription('Carpark Info - API description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('server.port'));
}

bootstrap()
  .then(() => {
    const hostname = getHost();
    console.info(`Started on http://${getHost()}/api`);
    console.info(`Docs available on http://${hostname}/docs`);
  })
  .catch((error) => {
    console.error('bootstrap starting error ', error);
  });
