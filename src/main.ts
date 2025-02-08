import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(error => ({
        field: error.property,
        errors: Object.values(error.constraints),
      }));
      return new BadRequestException(formattedErrors);
    },
  }));

  await app.listen(process.env.SERVER_PORT ?? 3000);
  Logger.log("Server Running at", process.env.SERVER_PORT);
}
bootstrap();
