import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BaseService } from '@service';
import { BookingEntity, DriverLocationEntity } from '@entity';
import { BookingRepository, DriverLocationRepository, DriverRepository, UserRepository } from '@repository';
import { getDistance } from 'geolib';
import { In, Not } from 'typeorm';
import { AppGateway } from 'src/app.gateway';
import { BookingItemRepository } from './booking-item.repository';

@Injectable()
export class BookingService extends BaseService<BookingEntity> {
  constructor(
    public readonly repo: BookingRepository,
    private readonly driverLocationRepo: DriverLocationRepository,
    private readonly driverRepo: DriverRepository,
    private readonly appGateway: AppGateway,
    private readonly userRepo: UserRepository,
    private readonly repoItem: BookingItemRepository
  ) {
    super(repo);
    this.listJoin = [
      'userID', 'driverID', 'bookings'
    ];
  }

  async create(body: CreateBookingDto, req: any) {


    const user = await this.repo.findOne({
      userID: req.user.id,
      status: Not('completed'),
    }
    );



    if (user) {
      throw new ConflictException('Bạn đang có đơn chưa hoàn thành, không thể đặt thêm');
    }

    // Tìm tài xế gần nhất trong phạm vi 5 km
    const nearestDriver = await this.findNearestDriver(body.fromLat, body.fromLng);



    if (!nearestDriver) {
      throw new NotFoundException('Không tìm thấy tài xế gần nhất');
    }

    // Tạo đơn hàng mới
    let booking = await this.repo.create({
      ...body,
      userID: req.user.id,
      driverID: nearestDriver.driverId,
      type: body.type || 'delivery'
    });

    booking = await this.repo.save(booking);
    const items = []

    if (body.type === 'delivery' && body.products && body.products.length > 0) {
      for (let i = 0; i < body.products.length; i++) {
        const product = await this.repoItem.create({
          ...body.products[i],
          bookingID: booking.id
        });
        await this.repoItem.save(product);
        items.push(product)
      }

    }

    this.appGateway.emitEvent('newBooking', {
      ...booking,
      user: await this.userRepo.findOne({
        id: req.user.id,
      }),
      items
    });

    return {
      ...booking,
      driver: await this.driverRepo.findOne({
        id: booking.driverID
      }),
      items
    };
  }

  async findNearestDriver(lat: number, lng: number): Promise<DriverLocationEntity | null> {
    // Lấy danh sách tất cả các tài xế có trạng thái sẵn sàng
    const availableDrivers = await this.driverRepo.find({
      availabilityStatus: 'available',
      onlineStatus: 'online',
    });

    if (availableDrivers.length === 0) {
      return null;
    }

    // Get the IDs of the available drivers
    const driverIds = availableDrivers.map(driver => driver.id);

    const driverLocations = await Promise.all(
      driverIds.map(async driverId => {
        return this.driverLocationRepo.findOne({
          driverId // Correctly use driverId in the where clause
        });
      })
    );

    const MAX_DISTANCE = 5000;
    let nearestDriver = null;
    let minDistance = MAX_DISTANCE;

    driverLocations.forEach(location => {
      const distance = getDistance(
        { latitude: lat, longitude: lng },
        { latitude: location.latitude, longitude: location.longitude }
      );



      if (distance <= MAX_DISTANCE && distance < minDistance) {
        nearestDriver = location;
        minDistance = distance;
      }
    });

    return nearestDriver;
  }


  async update(id: string, body: any) {
    return await this.repo.update(id, body)
  }

  async getUserOrderHistory(userId: string): Promise<BookingEntity[]> {
    return this.repo.find( { userID: userId } );
  }

  // Method to get driver's order history
  async getDriverOrderHistory(driverId: string): Promise<BookingEntity[]> {
    return this.repo.find({ driverID: driverId });
  }

  // Method to get financial records by month
  async getFinancialsByMonth(month: number, year: number): Promise<any> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // last day of the month
    return this.repo.createQueryBuilder('booking')
      .select('SUM(booking.amount)', 'total')
      .where('booking.createdAt >= :startDate', { startDate })
      .andWhere('booking.createdAt <= :endDate', { endDate })
      .getRawOne();
  }

  // Method to get financial records by specific date
  async getFinancialsByDate(date: string): Promise<any> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1); // next day
    return this.repo.createQueryBuilder('booking')
      .select('SUM(booking.amount)', 'total')
      .where('booking.createdAt >= :startDate', { startDate })
      .andWhere('booking.createdAt < :endDate', { endDate })
      .getRawOne();
  }
}
