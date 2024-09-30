import { BaseEntity, ProductEntity, UserEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('cart')
export class CartEntity extends BaseEntity {

    @Column()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        example: faker.string.uuid()
    })
    productId: string;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int({ max: 2 })
    })
    quantity: number;

    @Column()
    userId : string

    @JoinColumn()
    @OneToMany((): typeof ProductEntity => ProductEntity, (product) => product.cart)
    product: ProductEntity;
}
