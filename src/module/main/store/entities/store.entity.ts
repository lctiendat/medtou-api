import { BaseEntity, OrderEntity, ProductEntity, UserEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('stores')
export class StoreEntity extends BaseEntity {
    @Column({
        nullable: true
    })
    @IsOptional()
    @ApiProperty({
        example: faker.lorem.paragraph()
    })
    description: string

    @Column()
    @IsNotEmpty()
    @ApiProperty({ example: faker.string.uuid() })
    userId: string

    @Column({
        default: null
    })
    @IsOptional()
    @ApiProperty({ example: faker.string.uuid() })
    addressId: string

    @JoinColumn()
    @OneToOne((): typeof UserEntity => UserEntity, (user) => user.store)
    user: UserEntity

    @JoinColumn()
    @OneToMany(() => ProductEntity, product => product.store)
    product: ProductEntity[]

    @JoinColumn()
    @OneToOne(()=> OrderEntity, order => order.store)
    order: OrderEntity
}
