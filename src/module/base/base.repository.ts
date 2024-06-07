import { Injectable } from "@nestjs/common";
import { ObjectLiteral, Repository } from "typeorm";

@Injectable()
export class BaseRepository<T extends ObjectLiteral> extends Repository<T> { }

