import { BaseEntity, OrderItemEntity, StoreEntity, UserEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { EOrderStatus } from "src/enum";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('order')
export class OrderEntity extends BaseEntity {

    @Column()
    userId: string;

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
    @OneToMany(() => OrderItemEntity, (odp: OrderItemEntity) => odp.order)
    orderItem: OrderItemEntity[]
}
