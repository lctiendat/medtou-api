import { BaseRepository } from "@repository";
import { CategoryEntity, BookingEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BookingRepository extends BaseRepository<BookingEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(BookingEntity, dataSource.createEntityManager());
    }
}