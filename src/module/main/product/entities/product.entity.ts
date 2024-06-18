import { BaseEntity, CartEntity, CategoryEntity, StoreEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity('products')
export class ProductEntity extends BaseEntity {
    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.lorem.text()
    })
    name: string

    @Column({
        nullable: true
    })
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: faker.lorem.text()
    })
    description: string

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int()
    })
    quantity: number

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int()
    })
    price: number

    // @Column()
    @IsOptional()
    @IsArray()
    images: Array<string>

    @Column()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ 
        example: faker.string.uuid()
    })
    categoryId: string

    @Column()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        example: faker.string.uuid()
    })
    storeId: string

    @JoinColumn()
    @OneToOne((): typeof CategoryEntity => CategoryEntity, (category: CategoryEntity) => category.product)
    category: CategoryEntity

    @JoinColumn()
    @OneToOne((): typeof StoreEntity => StoreEntity, (store: StoreEntity) => store.product)
    store: StoreEntity

    @JoinColumn()
    @OneToOne((): typeof CartEntity => CartEntity, (cart: CartEntity) => cart.product)
    cart: CartEntity

    
}
