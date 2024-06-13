import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Route } from 'src/shared/decorate/route.decorate';

@Route('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto) {
    return {
      message: 'Create store successful',
      data: await this.storeService.create(createStoreDto)
    }
  }

  @Get()
  async findAll() {
    return {
      message: "Get all store successfully",
      data: await this.storeService.findAll()
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      message: "Get store successfully",
      data: await this.storeService.findOne(id)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return {
      message: "Update store successfully",
      data: await this.storeService.update(id, updateStoreDto)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      message: "Delete store successfully",
      data: await this.storeService.remove(id)
    }
  }
}
