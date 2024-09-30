import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from '@controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '@entity';
import { BookingRepository, DriverLocationRepository, DriverRepository, UserRepository } from '@repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from '@setup';
import { AppGateway } from 'src/app.gateway';
import { BookingItemEntity } from './entities/booking-item.entity';
import { BookingItemRepository } from './booking-item.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity, BookingItemEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME },
    })
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, DriverLocationRepository, DriverRepository, AppGateway, UserRepository,BookingItemRepository],
})
export class BookingModule { }
