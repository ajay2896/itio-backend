import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema({
    collection: 'products'
})
export class Product {

    @Prop({ required: true })
    readonly name: string;
  
    @Prop({ required: true })
    readonly brand: string;
  
    @Prop({ required: true })
    readonly category: string;
  
    @Prop({ required: true, type: Number })
    readonly price: number;
  
    @Prop({ required: true, type: Number })
    readonly stock: number;
  
    @Prop({ type: String })
    readonly description?: string;
  
    @Prop({ type: String, required: true })
    readonly imagesLink: string;
  
    @Prop({ default: true })
    readonly isAvailable: boolean;

    @Prop({ type: String, required: true})
    readonly createdBy: string;

    @Prop({ type: Number, default: Date.now()})
    readonly createdAt: number;

    @Prop({ type: Number, default: null})
    readonly updatedAt: number;


}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);