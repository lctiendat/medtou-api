import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseService } from '@service';
import { ProductEntity } from '@entity';
import { CategoryRepository, ProductRepository } from '@repository';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(public readonly repo: ProductRepository,
    public readonly cateRepo: CategoryRepository,
  ) {
    super(repo);
    this.listJoin = ['category', 'store', 'store.user']
  }
  async create(body: CreateProductDto, req: any) {
    
    let { categoryId } = body
    const cate = await this.cateRepo.findById(categoryId)
    if (!!!cate) {
      throw new NotFoundException('Category not found')
    }

    const dataProduct: ProductEntity = await this.repo.create({ ...body, storeId: req.user.id })
    await this.repo.save(dataProduct)
    return dataProduct 
  }

  async update(id: string, body: UpdateProductDto, req: any) {
    const data = await this.findOne(id)
    if (data.storeId !== req.user.id) {
      throw new ForbiddenException
    }
    if (data.categoryId !== body.categoryId) {
      const cate = await this.cateRepo.findById(body.categoryId)
      if (!!!cate) {
        throw new NotFoundException('Category not found')
      }
    }
    await this, this.repo.update(id, body)
    return null
  }
}
