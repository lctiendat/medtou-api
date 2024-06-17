import { BaseEntity, CategoryEntity, StoreEntity } from "@entity";
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

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int()
    })
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int()
    })
    price: number

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
    @OneToOne((): typeof CategoryEntity => CategoryEntity, category => category.product)
    category: CategoryEntity

    @JoinColumn()
    @ManyToOne((): typeof StoreEntity => StoreEntity, store => store.product)
    store: StoreEntity
}
