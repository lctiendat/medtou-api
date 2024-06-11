import { Transform, Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    perPage?: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    filter?: string;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    sorts?: string;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    extend?: string | object;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    skip?: string | object;

    @IsOptional()
    fullTextSearch?: string;

    where?: object[];

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    array?: string[];
}