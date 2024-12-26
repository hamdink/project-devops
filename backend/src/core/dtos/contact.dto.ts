import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto{



    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    objet: string;

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

export class UpdateContactDto{
   
    
    @ApiPropertyOptional()
    @IsString()
    firstName: string;

    @ApiPropertyOptional()
    @IsString()
    lastName: string;

    @ApiPropertyOptional()
    @IsString()
    email: string;

    @ApiPropertyOptional()
    @IsString()
    message: string;

    @ApiPropertyOptional()
    @IsString()
    phone: string;

    @ApiPropertyOptional()
    @IsString()
    objet: string;

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