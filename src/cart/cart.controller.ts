import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { InjectConnection } from '@nestjs/mongoose';

@Controller('cart')
export class CartController {


    constructor(
        @InjectConnection() private readonly dbConnection,
        private readonly cartService: CartService
    ) {}

    async AddItemsIntoCartService(productId,user) {

        let { id } = user;

    }


}
