import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UsersCart } from './schema/cart.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CartService {

    constructor(
        @InjectModel(UsersCart.name) private readonly usersCartModel: Model<UsersCart>
    ) {}


    async addItemsToCart(userId: string, addToCartDto) {
    }


}
