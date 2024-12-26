import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateFaqDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    question: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    answer: string;

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

export class UpdateFaqDto {
    @ApiPropertyOptional()
    @IsString()
    question: string;

    @ApiPropertyOptional()
    @IsString()
    answer: string;

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