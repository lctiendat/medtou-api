import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseService, StoreService } from '@service';
import { OrderEntity } from '@entity';
import {  OrderRepository, ProductRepository, StoreRepository } from '@repository';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(
    public readonly repo: OrderRepository,
    public readonly storeRepo: StoreRepository,
    public readonly productRepo: ProductRepository,
    public storeSevice: StoreService,
    public dataSource: DataSource
  ) {
    super(repo)
  }
  async create(body: CreateOrderDto, req) {
    const { products, ...data } = body
    // await this.storeSevice.findOne(data.storeId);

    if (products && products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        const product = await this.productRepo.findById(products[i].productId);

        if (!product) {
          throw new NotFoundException('Product not found');
        }

        if (products[i].quantity && products[i].quantity > product.quantity) {
          throw new NotFoundException('Quantity not enough');
        }

        const productStore = await this.productRepo.findOne({ id: products[i].productId});

        if (!productStore) {
          throw new NotFoundException('Product not in store');
        }
      }

      return await this.dataSource.transaction(async (entityManager: EntityManager) => {
        const order = await entityManager.save(entityManager.create(OrderEntity, { ...body, userId: req.user.id }));

        for (let i = 0; i < products.length; i++) {
          const product = await this.productRepo.findById(products[i].productId);
        }
        return order;
      })
    }

  }



  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
