import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class ProductService {

    constructor(
        @InjectConnection() private readonly dbConnection: Connection,
        @InjectModel(Product.name) private readonly productModel: Model<Product>
    ) {}


    async createNewProduct(body, user) {

        if(!user.isAdmin) throw new ForbiddenException("You have no permission to use this api resoursces");

        body['createdBy'] = user._id;

        let createProduct = await this.productModel.create(body);

        if(!createProduct) throw new InternalServerErrorException('Something goes wrong, Try after sometime');
 

        return{
            success: true,
            message: "Successfully created new product"
        };

    }


    async getProductById(id, user) {

        // if(!user.isAdmin) throw new NotAcceptableException("You have no permission to use this api resoursces");

        let product = await this.productModel.findById(id).exec();

        return {
            success: true,
            data: product
        }


    }

    async getAllProducts(clientQuery, user) {

        // if(!user.isAdmin) throw new NotAcceptableException("You have no permission to use this api resoursces");

        let products = await this.productModel.find().skip(Number(clientQuery.skip)).limit(Number(clientQuery.limit)).sort({_id:-1});

        return {
            success: true,
            data: products
        }

    }

    async updateProduct(body, id, user) {


        if (!user.isAdmin) throw new NotAcceptableException("You have no permission to use this api resoursces");
        
    
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, body);
    
        if (!updatedProduct)  throw new NotFoundException("Product not found");
    
        return {
            success: true,
            message: 'Successfully update the product'
        };
    }

    async deleteProduct(id, user) {


        if (!user.isAdmin) throw new NotAcceptableException("You have no permission to use this api resoursces");
    
        const deletedProduct = await this.productModel.findByIdAndDelete(id);
    
        if (!deletedProduct) throw new NotFoundException("Product not found");
            
        return { 
            success: true, 
            message: "Product deleted successfully" 
        };
    }
    

}
