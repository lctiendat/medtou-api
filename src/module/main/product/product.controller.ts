import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Route } from 'src/shared/decorate/route.decorate';
import { RolesGuard } from 'src/module/core/user/guard/role.guard';
import { JwtAuthGuard } from 'src/module/core/user/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/module/core/user/guard/roles.decorator';
import { ROLE } from 'src/setup/enum';
import { ProductEntity } from '@entity';

@Route('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.STORE)
  async create(@Body() createProductDto: CreateProductDto, @Request() req: any): Promise<ProductEntity | any> {
    const data = await this.productService.create(createProductDto, req)
    return {
      message: 'Create product successful',
      data
    }
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.STORE)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req: any) {
    return await this.productService.update(id, updateProductDto, req)
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.STORE)
  async remove(@Param('id') id: string) {
    await this.productService.delete(id);
    return
  }
}
