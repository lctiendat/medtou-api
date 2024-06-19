import { BaseEntity, OrderEntity, ProductEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";


@Entity('order_product')
export class OrderProductEntity extends BaseEntity{
    
    @Column()
    @IsUUID()
    orderId: string;

    @Column()
    @IsUUID()
    productId: string;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int({ max: 2 })
    })
    quantity: number;

    @Column()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int({ max: 2 })
    })
    price: number;

    @JoinColumn()
    @OneToOne((): typeof ProductEntity => ProductEntity, (product) => product.orderProduct)
    product: ProductEntity;

    @JoinColumn()
    @OneToOne((): typeof OrderEntity => OrderEntity, (order) => order.orderProduct)
    order: OrderEntity;


}