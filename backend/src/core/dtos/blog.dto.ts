import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateBlogDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ type: "string", format: "binary" })
    image: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    person: string;

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

export class UpdateBlogDto{
    @ApiPropertyOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsString()
    content: string;

    @ApiPropertyOptional()
    @IsString()
    image: string;

    @ApiPropertyOptional()
    @IsString()
    person: string;

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