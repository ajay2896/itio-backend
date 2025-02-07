import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { UsersCart } from './schema/cart.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CartService {

    constructor(
        @InjectModel(UsersCart.name) private  cartModel: Model<UsersCart>,
        @InjectConnection() private dbConnection:Connection,
    ) {}


    async addItemsIntoCartService(productId: string, user: any) {
        let { id } = user;

        let isProduct = await this.dbConnection.collection('products').findOne({ productId });

        if (!isProduct) throw new NotFoundException("This product is not available");
        
        if (isProduct.stock === 0) throw new NotAcceptableException("This product is out of stock");

        let userCart = await this.cartModel.findOne({ userId: id });

        if (!userCart) {
            userCart = new this.cartModel({ userId: id, items: [], totalPrice: 0 });
        }

        const existingItem:any = userCart.items.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.price = existingItem.quantity * isProduct.price;
        } else {

            const newCartItem = new (userCart.items as any).constructor({
                productId,
                quantity: 1,
                price: isProduct.price,
            });
            
            userCart.items.push(newCartItem);
            
        }

        userCart.totalPrice = userCart.items.reduce((acc, item) => acc + item.price, 0);

        await userCart.save();
        
        return {
            success: true,
            message: "Successfully added to your cart"
        };
    }

    async removeItemFromCartService(cartItemId: string, user: any) {

        let { id } = user;

        let userCart = await this.cartModel.findOne({ userId: id });

        if (!userCart) throw new NotFoundException("Cart not found");

        const itemIndex = userCart.items.findIndex(item => item._id.toString() === cartItemId);

        if (itemIndex === -1) throw new NotFoundException("Item not found in cart");

        userCart.items.splice(itemIndex, 1);

        userCart.totalPrice = userCart.items.reduce((acc, item) => acc + item.price, 0);

        await userCart.save();

        return {
            success: true,
            message: "Successfully removed items from your cart"
        };
    }


}
