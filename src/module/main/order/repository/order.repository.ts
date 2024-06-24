import { BaseRepository } from "@repository";
import { CategoryEntity, OrderEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(OrderEntity, dataSource.createEntityManager());
    }
}