import { DriverEntity } from './driver.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsUUID } from 'class-validator';
import { BaseEntity } from '@entity';

@Entity('driver_locations')
export class DriverLocationEntity extends BaseEntity {
    @ManyToOne(type => DriverEntity, driver => driver.driverLocations)
    @JoinColumn()
    @ApiProperty()
    driver: DriverEntity;

    @Column()
    @IsUUID()
    @IsNotEmpty()
    driverId : string

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    @IsNotEmpty()
    @IsNumber() 
    @ApiProperty({
        example: 40.7128,
    })
    latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: -74.0060,
    })
    longitude: number;

    @CreateDateColumn()
    @ApiProperty({
        example: new Date().toISOString(),
    })
    timestamp: Date;

    
}
