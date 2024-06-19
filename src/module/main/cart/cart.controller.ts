import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Route } from 'src/shared/decorate/route.decorate';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/core/user/guard/jwt-auth.guard';
import { RolesGuard } from 'src/module/core/user/guard/role.guard';
import { Roles } from 'src/module/core/user/guard/roles.decorator';
import { ROLE } from 'src/setup/enum';

@Route('cart')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.USER)
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  create(@Body() createCartDto: CreateCartDto, @Request() req: any) {
    return this.cartService.create(createCartDto, req);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.cartService.findAll({ userId: req.user.id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto, @Request() req: any) {
    return this.cartService.update(id, updateCartDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.deleteHard(id)
  }
}
