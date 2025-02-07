import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersCart, UsersCartSchema } from './schema/cart.schema';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: UsersCart.name, schema: UsersCartSchema }
    ]),
  ],

  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
