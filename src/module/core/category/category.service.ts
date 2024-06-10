import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@dto';
import { CategoryEntity, CategoryLogEntity } from '@entity';
import { BaseService } from '@service';
import { CategoryLogRepository, CategoryRepository } from '@repository';
import { CRUD } from 'src/setup/enum';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(public readonly repo: CategoryRepository,
    public readonly repoLog: CategoryLogRepository,
    private dataSource: DataSource,

  ) {
    super(repo)
  }
  async create(data: CreateCategoryDto, req): Promise<CategoryEntity> {
    return await this.dataSource.transaction(async (entityManager) => {
      if (!!data.parentId) {
        const cate = await this.repo.findOne({
          where: {
            id: data.parentId
          }
        })
        if (!!!cate) {
          throw new NotFoundException('Parent category not found')
        }
      }

      const newCate = await entityManager.save(entityManager.create(CategoryEntity, data))
      if (!!req.user && !!req.user.id) {
        await entityManager.save(
          entityManager.create(CategoryLogEntity,
            {
              userId: req.user.id,
              categoryId: newCate.id,
              type: CRUD.CREATE
            }))
      }
      return newCate
    })

  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
