import { BookingEntity, DriverLocationEntity, UserEntity } from '@entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

@Entity('drivers')
export class DriverEntity extends UserEntity {

    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'ABC123456',
    })
    licenseNumber: string;

    @Column({
        nullable: true
    })
    @IsNotEmpty() 
    @IsString()
    @ApiProperty({
        example: 'ABC123456',
    })
    plate: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'ABC123456',
    })
    carModel: string;

    @Column({ nullable: true, type: 'float', default: 0 })
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        example: 4.9,
    })
    rating: number;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'available',
    })
    availabilityStatus: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'online',
    })
    onlineStatus: string;


    @OneToMany(type => DriverLocationEntity, driverLocation => driverLocation.driver)
    driverLocations: DriverLocationEntity[];


} 
 