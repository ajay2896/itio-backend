import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class CartItems {
    @Prop({ type: String })
    productId: string;

    @Prop({ type: Number})
    quantity: number;

    @Prop({ type: Number})
    price: number;
}

export type CartItemsDocument = HydratedDocument<CartItems>;

export const CartItemsSchema = SchemaFactory.createForClass(CartItems);
