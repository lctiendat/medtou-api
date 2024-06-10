import { Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@dto';
import { Route } from 'src/shared/decorate/route.decorate';
import { JwtAuthGuard } from '../user/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Route('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async create(@Request() req: any, @Body() body: CreateCategoryDto): Promise<any> {
    
    const data = await this.categoryService.create(body, req);
    return {
      message: 'Create category successful',
      data
    }
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
