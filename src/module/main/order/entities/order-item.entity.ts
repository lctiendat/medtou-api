import { BaseEntity, OrderEntity, ProductEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";


@Entity('order_item')
export class OrderItemEntity extends BaseEntity{
    
    @Column()
    @IsUUID()
    orderId: string;

    @Column()
    @IsString()
    @ApiProperty({
        example: faker.string.sample()
    })
    name: string;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int({ max: 2 })
    })
    quantity: number;

    @Column()
    @IsString()
    @ApiProperty({
        example: faker.string.sample()
    })
    image: string;

    @JoinColumn()
    @ManyToOne((): typeof OrderEntity => OrderEntity, (order) => order.orderItem)
    order: OrderEntity;
}