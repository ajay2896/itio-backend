import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorator/common.decorator';

@Controller('product')
// @UseGuards(AuthGuard('jwt'))
export class ProductController {


    constructor(
        private readonly productService: ProductService
    ) {}


    @Post('createProduct')
    createProduct(@Body() body:any,@GetUser() user:any) {

        return this.productService.createNewProduct(body, user);

    }

    @Get('getAllProducts')
    getAllProducts(@Query() clientQuery,@GetUser() user:any) {

        return this.productService.getAllProducts(clientQuery,user);

    }

    @Get('getProductId/:id')
    getProduct(@Param('id') id,@GetUser() user:any) {

        return this.productService.getProductById(id,user);

    }

    @Put('updateProduct/:id')
    updateProductById(@Param('id') id, @Body() body,@GetUser() user:any) {

        return this.productService.updateProduct(body,id,user);

    }

    @Delete('deleteProduct/:id')
    deleteProductById(@Param('id') id,@GetUser() user:any) {

        return this.productService.deleteProduct(id,user);

    }



}
