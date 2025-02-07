import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { CartItemsDocument, CartItemsSchema } from "./common-schema/items.schema";

@Schema({ collection: 'usersCart', timestamps: true })
export class UsersCart {

    @Prop({ type: String, required: true })
    readonly userId: string;

    @Prop({ type: [CartItemsSchema], required: true })
    readonly items: CartItemsDocument[];

    @Prop({ type: Number, required: true, default: 0 })
    readonly totalPrice: number;

    @Prop({ type: Number, default: Date.now() })
    readonly createdAt: number;

    @Prop({ type: Number, default: null })
    readonly updatedAt: number;
}

export type UsersCartDocument = HydratedDocument<UsersCart>;

export const UsersCartSchema = SchemaFactory.createForClass(UsersCart);
