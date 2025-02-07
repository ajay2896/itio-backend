import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class CartItems {
    @Prop({ type: String, required: true })
    readonly productId: string;

    @Prop({ type: Number, required: true })
    readonly quantity: number;

    @Prop({ type: Number, required: true })
    readonly price: number;
}

export type CartItemsDocument = HydratedDocument<CartItems>;

export const CartItemsSchema = SchemaFactory.createForClass(CartItems);
