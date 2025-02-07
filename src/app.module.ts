import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI),

    
    AuthModule,
    ProductModule,
    CartModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
