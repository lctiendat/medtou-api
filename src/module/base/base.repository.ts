import { Injectable } from "@nestjs/common";
import { FindOneOptions, ObjectLiteral, Repository } from "typeorm";




@Injectable()
export class BaseRepository<T extends ObjectLiteral> extends Repository<T> { }

