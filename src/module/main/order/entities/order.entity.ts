import { BaseEntity, OrderProductEntity, StoreEntity, UserEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { EOrderStatus } from "src/enum";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('order')
export class OrderEntity extends BaseEntity {

    @Column()
    userId: string;

    @Column()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        example: faker.string.uuid()
    })
    storeId: string;

    @Column({
        default: EOrderStatus.PENDING
    })
    status: EOrderStatus;

    @Column({
        nullable: true
    })
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: faker.lorem.paragraph()
    })
    note: string;

    @Column({
        nullable: true
    })
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: faker.lorem.paragraph()
    })
    canceledReason: string

    @Column({
        nullable: true
    })
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: faker.lorem.paragraph()
    })
    refundedReason: string

    @JoinColumn()
    @OneToOne(() => UserEntity, (user: UserEntity) => user.order)
    user: UserEntity

    @JoinColumn()
    @OneToOne(() => StoreEntity, (store: StoreEntity) => store.order)
    store: StoreEntity

    @JoinColumn()
    @OneToMany(() => OrderProductEntity, (odp: OrderProductEntity) => odp.order)
    orderProduct: OrderProductEntity
}
