import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Route } from 'src/shared/decorate/route.decorate';
import { RolesGuard } from 'src/module/core/user/guard/role.guard';
import { JwtAuthGuard } from 'src/module/core/user/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/module/core/user/guard/roles.decorator';
import { ROLE } from 'src/setup/enum';
import { BookingEntity } from '@entity';
import { AppGateway } from 'src/app.gateway';
import { Not } from 'typeorm';

@Route('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService,
    private readonly appGateway: AppGateway) { }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req: any): Promise<BookingEntity | any> {
    const data = await this.bookingService.create(createBookingDto, req);
    return {
      message: 'Đặt thành công',
      data
    };
  }

  @Get('user/history')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.USER)
  async getUserOrderHistory(@Request() req: any) {
    return this.bookingService.getUserOrderHistory(req.user.id);
  }

  @Get('driver/history')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.DRIVER)
  async getDriverOrderHistory(@Request() req: any) {
    return this.bookingService.getDriverOrderHistory(req.user.id);
  }

  @Get('details/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getOrderDetails(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Get('financials')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getFinancials(@Query('month') month: number, @Query('year') year: number) {
    return this.bookingService.getFinancialsByMonth(month, year);
  }

  @Get('financials/:date')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getFinancialsByDate(@Param('date') date: string) {
    return this.bookingService.getFinancialsByDate(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Get('driver/:driverId')
  findBookingByDriver(@Param('driverId') id: string) {
    return this.bookingService.findOne(null, { driverID: id, status: Not('completed') });
  }

  @Patch('arrived/:id')
  async arrived(@Param('id') id: string, @Request() req: any) {
    const user = await this.bookingService.findOne(id);
    this.appGateway.emitEvent('driverArrived', { ...user });
    return await this.bookingService.update(id, { status: 'arrived' });
  }

  @Patch('pickup/:id') // API để cập nhật trạng thái 'pickup'
  async pickup(@Param('id') id: string, @Request() req: any) {
    const user = await this.bookingService.findOne(id);
    this.appGateway.emitEvent('pickupEvent', { ...user });
    return await this.bookingService.update(id, { status: 'pickup' });
  }

  @Patch('delivered/:id') // API để cập nhật trạng thái 'delivered'
  async delivered(@Param('id') id: string, @Request() req: any) {
    const user = await this.bookingService.findOne(id);
    this.appGateway.emitEvent('deliveryEvent', { ...user });
    return await this.bookingService.update(id, { status: 'delivered' });
  }

  @Patch('completed/:id') // API để cập nhật trạng thái 'completed'
  async completed(@Param('id') id: string, @Request() req: any) {
    const user = await this.bookingService.findOne(id);
    this.appGateway.emitEvent('completionEvent', { ...user });
    return await this.bookingService.update(id, { status: 'completed' });
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.STORE)
  async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @Request() req: any) {
    // Implement the method to update booking with specific details
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.STORE)
  async remove(@Param('id') id: string) {
    await this.bookingService.delete(id);
    return;
  }
}
