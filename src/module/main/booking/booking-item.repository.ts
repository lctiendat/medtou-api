import { BaseRepository } from "@repository";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BookingItemEntity } from "./entities/booking-item.entity";


@Injectable()
export class BookingItemRepository extends BaseRepository<BookingItemEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(BookingItemEntity, dataSource.createEntityManager());
    }
}