import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {


    constructor(
        private readonly productService: ProductService
    ) {}


    @Post('createProduct')
    createProduct(@Body() body) {

        const user = { isAdmin: true, mobileNumber: '8601694617', userType:'admin', _id: "56416414161" };

        return this.productService.createNewProduct(body, user);

    }

    @Get('getAllProducts')
    getAllProducts(@Query() clientQuery) {

        const user = { isAdmin: true, mobileNumber: '8601694617', userType:'admin', _id: "56416414161" };


        return this.productService.getAllProducts(clientQuery,user);

    }

    @Get('getProductId/:id')
    getProduct(@Param('id') id) {

        const user = { isAdmin: true, mobileNumber: '8601694617', userType:'admin', _id: "56416414161" };


        return this.productService.getProductById(id,user);

    }

    @Put('updateProduct/:id')
    updateProductById(@Param('id') id, @Body() body) {

        const user = { isAdmin: true, mobileNumber: '8601694617', userType:'admin', _id: "56416414161" };


        return this.productService.updateProduct(body,id,user);

    }

    @Delete('deleteProduct/:id')
    deleteProductById(@Param('id') id) {


        const user = { isAdmin: true, mobileNumber: '8601694617', userType:'admin', _id: "56416414161" };


        return this.productService.deleteProduct(id,user);


    }



}
