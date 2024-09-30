import { BaseEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { UserEntity, DriverEntity } from "@entity";
import { BookingItemEntity } from "./booking-item.entity";

function generateString() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Các chữ cái có thể sử dụng
    const numbers = "0123456789"; // Các số có thể sử dụng

    // Chọn một chữ cái ngẫu nhiên
    const firstChar = letters.charAt(Math.floor(Math.random() * letters.length));

    // Tạo 9 chữ số ngẫu nhiên
    let numberString = '';
    for (let i = 0; i < 9; i++) {
        numberString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    // Kết hợp chữ cái đầu tiên với chuỗi số
    return firstChar + numberString;
}

@Entity('booking')
export class BookingEntity extends BaseEntity {

    @Column()
    bookingID : string

    @BeforeInsert()
    generateBookingID() {
        this.bookingID = generateString();
    }

    @ManyToOne(() => UserEntity, user => user.bookings)
    @JoinColumn({ name: 'userID' }) // Set up foreign key column
    @Column()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        example: faker.string.uuid()
    }) 
    userID: string;

    @ManyToOne(() => DriverEntity, driver => driver.bookings)
    @JoinColumn({ name: 'driverID' }) // Set up foreign key column
    @Column()
    @IsUUID()
    @ApiProperty({
        example: faker.string.uuid()
    })
    driverID: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "123 Main St, Springfield"
    })
    fromAddress: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "456 Elm St, Springfield"
    })
    toAddress: string;

    @Column({ type: 'float' })
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.location.latitude()
    })
    fromLat: number;

    @Column({ type: 'float' })
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.location.longitude()
    })
    fromLng: number;

    @Column({ type: 'float' })
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.location.latitude()
    })
    toLat: number;

    @Column({ type: 'float' })
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.location.longitude()
    })
    toLng: number;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int({ min: 1, max: 100 })
    })
    distance: number;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: faker.number.int({ min: 1000, max: 10000 })
    })
    cost: number;

    @Column({
        default: 'pending'
    })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "pending"
    })
    status: string;

    @Column({
        default: "delivery"
    })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "delivery"
    })
    type: string;

    @JoinColumn()
    @OneToMany(() => BookingItemEntity, order => order.bookingID)
    bookings: BookingItemEntity[]
}