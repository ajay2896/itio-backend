import { Body, Controller, Delete, Get, NotAcceptableException, NotFoundException, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GetUser } from 'src/common/decorator/common.decorator';

@Controller('cart')
export class CartController {


    constructor(
        private readonly cartService: CartService
    ) {}


    @Get('getCartsItems')
    getUserCarts(@GetUser() user:any) {

        return this.cartService.getUserCart(user);

    }


    @Post("addCartItem")
    addCartItem(@Body('productId') productId,@GetUser() user:any) {

        return this.cartService.addItemsIntoCartService(productId,user);

    }

    @Delete("removedCartItems/:itemId")
    removedItemsFromCart(@Param('itemId') itemId,@GetUser() user:any) {

        return this.cartService.removeItemFromCartService(itemId,user);

    }


}
