import { Body, Controller, Delete, NotAcceptableException, NotFoundException, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('cart')
export class CartController {


    constructor(
        private readonly cartService: CartService
    ) {}


    @Post("addCartItem")
    addCartItem(@Body('productId') productId) {

        const user = { id:"kjfnkjfnkrj", isAdmin:false };

        return this.cartService.addItemsIntoCartService(productId,user);

    }

    @Delete("removedItems/:itemId")
    removedItemsFromCart(@Param('itemId') itemId) {

        const user = { id:"kjfnkjfnkrj", isAdmin:false };

        return this.cartService.removeItemFromCartService(itemId,user);

    }


}
