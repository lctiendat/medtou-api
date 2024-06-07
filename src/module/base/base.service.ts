import { ObjectLiteral } from "typeorm";
import { BaseRepository } from "@repository";
import { Injectable } from "@nestjs/common";
@Injectable()
export class BaseService<T extends ObjectLiteral> {
    constructor(public readonly repo: BaseRepository<T>) {
    }
}

