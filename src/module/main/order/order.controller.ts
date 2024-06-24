import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Route } from 'src/shared/decorate/route.decorate';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/core/user/guard/jwt-auth.guard';
import { RolesGuard } from 'src/module/core/user/guard/role.guard';
import { Roles } from 'src/module/core/user/guard/roles.decorator';
import { ROLE } from 'src/setup/enum';


@Route('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.USER)
  create(@Body() body: CreateOrderDto, @Request() req: any) {
    return this.orderService.create(body, req);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
