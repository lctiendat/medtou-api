import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { BaseService } from '@service';
import { CartEntity, ProductEntity } from '@entity';
import { CartRepository, ProductRepository } from '@repository';

@Injectable()
export class CartService extends BaseService<CartEntity> {
  constructor(public readonly repo: CartRepository,
    public readonly productRepo: ProductRepository
  ) {
    super(repo);
    this.listJoin = ['product', 'product.store', 'product.store.user', 'product.category', 'user']
  }
  async create(body: CreateCartDto, req: any): Promise<CartEntity> {
    if (body.quantity && body.quantity === 0) {
      throw new BadRequestException('Quantity must be greater than zero')
    }
    const product: ProductEntity = await this.productRepo.findById(body.productId)

    if(!!!product) {
      throw new NotFoundException('Product not found')
    }
    const cart = await this.repo.findOne({
      productId: body.productId,
      userId: req.user.id
    })
    if (!!cart) {
      cart.quantity += body.quantity
      await this.repo.save(cart)
      return cart
    }
    const data: CartEntity = await this.repo.create({
      ...body,
      userId: req.user.id
    })
    await this.repo.save(data)
    return data
  }

 async update(id: string, body: UpdateCartDto, req: any) {
      const data: CartEntity = await this.findOne(id)
      const product: ProductEntity = await this.productRepo.findById(body.productId)
      
      if(!!!product) {
        throw new NotFoundException('Product not found')
      }
      if (body.quantity && body.quantity === 0) {
        throw new BadRequestException('Quantity must be greater than zero')
      }
      data.quantity = body.quantity
      await this.repo.save(data)
      return data
  }
}
