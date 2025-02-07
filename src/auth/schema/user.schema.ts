import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedArraySubdocument, HydratedDocument } from "mongoose";


@Schema({
    collection: 'users'
})
export class User {

    @Prop({ type:String, required: true})
    readonly mobileNumber: string;

    @Prop({ type: String, required: true })
    readonly password: string;

    @Prop({ type: String, required: true})
    readonly userType: string;

    @Prop({ type: Boolean, required:true })
    readonly isAdmin: boolean;

    @Prop({ type: Number, default: Date.now()})
    readonly createdAt: number;

    @Prop({ type: Number, default: null})
    readonly updatedAt: number;
    

}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);