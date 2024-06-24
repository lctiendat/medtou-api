import { BaseRepository } from "@repository";
import { CategoryEntity, OrderProductEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class OrderProductRepository extends BaseRepository<OrderProductEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(OrderProductEntity, dataSource.createEntityManager());
    }
}