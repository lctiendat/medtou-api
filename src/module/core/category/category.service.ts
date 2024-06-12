import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@dto';
import { CategoryEntity, CategoryLogEntity } from '@entity';
import { BaseService } from '@service';
import { CategoryLogRepository, CategoryRepository } from '@repository';
import { CRUD } from 'src/setup/enum';
import { DataSource, EntityManager } from 'typeorm';

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
        const cate = await this.repo.findById({
          id: data.parentId
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

  findAll(): Promise<CategoryEntity[]> {
    return this.repo.find()
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const data: CategoryEntity = await this.repo.findById(id)
    if (!!!data) {
      throw new NotFoundException('Category not found')
    }
    return data
  }

  async update(id: string, req: any, updateCategoryDto: UpdateCategoryDto) {
    const data: CategoryEntity = await this.repo.findById(id)
    if (!!!data) {
      throw new NotFoundException('Category not found')
    }
    if (!!data.parentId) {
      const cate = await this.repo.findById({
        id: data.parentId
      })
      if (!!!cate) {
        throw new NotFoundException('Parent category not found')
      }
    }
    return await this.dataSource.transaction(async (entityManager: EntityManager) => {
      await entityManager.save(
        entityManager.create(CategoryLogEntity,
          {
            userId: req.user.id,
            categoryId: data.id,
            type: CRUD.UPDATE
          }))
      await this.repo.update(id, updateCategoryDto)
      return null
    })
  }

  async remove(id: string, req: any) {
    const data: CategoryEntity = await this.repo.findById(id)
    if (!!!data) {
      throw new NotFoundException('Category not found')
    }

    return await this.dataSource.transaction(async (entityManager: EntityManager) => {
      await entityManager.save(
        entityManager.create(CategoryLogEntity,
          {
            userId: req.user.id,
            categoryId: data.id,
            type: CRUD.DELETE
          }))
      await this.repo.delete(id)
      return null
    })
  }
}
