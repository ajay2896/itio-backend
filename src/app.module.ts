import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { LoggerMiddleware } from './auth/middleware/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './auth/global-error-handling/global-error-handling';
import { ProductController } from './product/product.controller';
import { CartController } from './cart/cart.controller';
import { CommonModule } from './common/common.module';


@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI),


    AuthModule,
    ProductModule,
    CartModule,
    CommonModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    consumer.apply(LoggerMiddleware).exclude(
      { path: 'auth/login', method: RequestMethod.POST },
      { path: 'auth/register', method: RequestMethod.POST }
    ).forRoutes(AuthController,ProductController,CartController);


  }

}
