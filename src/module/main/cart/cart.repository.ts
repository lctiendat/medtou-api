import { BaseRepository } from "@repository";
import { CartEntity, CategoryEntity, ProductEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class CartRepository extends BaseRepository<CartEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(CartEntity, dataSource.createEntityManager());
    }
}