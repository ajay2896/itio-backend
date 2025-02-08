import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { UsersCart } from './schema/cart.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class CartService {

    constructor(
        @InjectModel(UsersCart.name) private  cartModel: Model<UsersCart>,
        @InjectConnection() private dbConnection:Connection,
    ) {}

    async getUserCart(user:any) {

        let {_id } = user;

        let cartsData = await this.cartModel.findOne({ userId:_id});

        return {
            success: true,
            data: cartsData
        }

    }


    // async addItemsIntoCartService(productId: string, user: any) {
    //     let { _id } = user;

    //     let isProduct = await this.dbConnection.collection('products').findOne({ _id: new ObjectId(productId) });

    //     if (!isProduct) throw new NotFoundException("This product is not available");
        
    //     if (isProduct.stock === 0) throw new NotAcceptableException("This product is out of stock");

    //     let userCart = await this.cartModel.findOne({ userId: _id });

    //     if (!userCart) {
    //         userCart = await this.cartModel.create({ userId: _id, items: [], totalPrice: 0 });
    //         userCart.save();
    //     }

    //     console.log("----Cart----",userCart)

    //     const existingItem:any = userCart.items.find(item => item.productId === productId);

    //     if (existingItem) {
    //         existingItem.quantity += 1;
    //         existingItem.price = existingItem.quantity * isProduct.price;
    //     } else {

    //         const newCartItem = {
    //             productId,
    //             quantity: 1,
    //             price: isProduct.price,
    //         }


            
    //     }

    //     userCart.totalPrice = userCart.items.reduce((acc, item) => acc + item.price, 0);

    //     await userCart.save();
        
    //     return {
    //         success: true,
    //         message: "Successfully added to your cart"
    //     };
    // }

    
    async addItemsIntoCartService(productId: string, user: any) {
        let { _id } = user;
    
        // Ensure productId and userId are ObjectId types
        const productObjectId = new ObjectId(productId);
        const userObjectId = new ObjectId(_id);
    
        // Check if the product exists
        let isProduct = await this.dbConnection.collection('products').findOne({ _id: productObjectId });
    
        if (!isProduct) throw new NotFoundException("This product is not available");
    
        // Check if the product is in stock
        if (isProduct.stock === 0) throw new NotAcceptableException("This product is out of stock");
    
        // Find or create user cart
        let userCart = await this.cartModel.findOne({ userId: userObjectId });
    
        if (!userCart) {
            userCart = new this.cartModel({
                userId: userObjectId,
                items: [],
                totalPrice: 0
            });
            await userCart.save();
        }
    
        console.log("----Cart Found or Created----", userCart);
    
        // Check if product already exists in cart
        const existingItem = userCart.items.find(item => item.productId.toString() === productId);
    
        if (existingItem) {
            // Check stock before increasing quantity
            if (existingItem.quantity + 1 > isProduct.stock) {
                throw new NotAcceptableException("Not enough stock available");
            }
    
            existingItem.quantity += 1;
            existingItem.price = existingItem.quantity * isProduct.price;
        } else {
            // Create a new item as a Mongoose document
            const newCartItem:any = {
                productId: productObjectId,
                quantity: 1,
                price: isProduct.price
            }
    
            // Push new item to cart
            userCart.items.push(newCartItem);
        }
    
        // Update total price
        userCart.totalPrice = userCart.items.reduce((acc, item) => acc + item.price, 0);
    
        // Save updated cart
        await userCart.save();
    
        return {
            success: true,
            message: "Successfully added to your cart"
        };
    }
    

    async removeItemFromCartService(cartItemId: string, user: any) {

        let { _id } = user;

        let userCart = await this.cartModel.findOne({ userId: _id });

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
