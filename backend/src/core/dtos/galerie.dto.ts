import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class CreateGalerieDto {
    images: string[];

    videos: string[];
    @ApiPropertyOptional()
    @IsDate()
    createdAt: Date;

    @ApiPropertyOptional()
    @IsDate()
    updatedAt: Date;

    @ApiPropertyOptional()
    @IsDate()
    deletedAt: Date;
}

export class UpdateGalerieDto {
    images: string[];

    videos: string[];

    @ApiPropertyOptional()
    @IsDate()
    createdAt: Date;

    @ApiPropertyOptional()
    @IsDate()
    updatedAt: Date;

    @ApiPropertyOptional()
    @IsDate()
    deletedAt: Date;
}

