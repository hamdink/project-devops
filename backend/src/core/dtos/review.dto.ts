import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate,  IsEnum,  IsNotEmpty, IsString } from "class-validator";

export enum ReviewStatus {
    pending = "pending",
    approved = "approved",
}

export class CreateReviewDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({ enum: ReviewStatus })
    @IsEnum(ReviewStatus)
    @IsNotEmpty()
    status: ReviewStatus;

    image: string;

    avatar : string;

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

export class UpdateReviewDto {
    @ApiPropertyOptional()
    @IsString()
    userId: string;

    @ApiPropertyOptional()
    @IsString()
    fullName: string;

    @ApiPropertyOptional()
    @IsString()
    message: string;

    @ApiPropertyOptional({ enum: ReviewStatus })
    @IsString()
    status: ReviewStatus;

    image: string;

    avatar : string;

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