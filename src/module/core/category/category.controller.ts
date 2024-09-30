import { Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, PaginationQueryDto, UpdateCategoryDto } from '@dto';
import { Route } from 'src/shared/decorate/route.decorate';
import { JwtAuthGuard } from '../user/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoryEntity } from '@entity';
import { Roles } from '../user/guard/roles.decorator';
import { ROLE } from 'src/setup/enum';

@Route('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  @Roles(ROLE.ADMIN)
  async create(@Request() req: any, @Body() body: CreateCategoryDto): Promise<any> {
    const data: CategoryEntity = await this.categoryService.create(body, req);
    return {
      message: 'Create category successful',
      data
    }
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(ROLE.ADMIN)
  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, req, updateCategoryDto);
  }

  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles(ROLE.ADMIN)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.categoryService.remove(id, req);
  }
}
