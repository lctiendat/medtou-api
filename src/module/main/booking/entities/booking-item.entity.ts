import { BaseEntity, BookingEntity, OrderEntity, ProductEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";


@Entity('booking_item')
export class BookingItemEntity extends BaseEntity {

    @ManyToOne(() => BookingEntity, booking => booking.bookings)
    @JoinColumn({ name: 'userID' })
    @Column()
    @IsUUID()
    bookingID: string;

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

    @Column({ default: null })
    @IsString()
    @ApiProperty({
        example: faker.string.sample()
    })
    image: string;
}