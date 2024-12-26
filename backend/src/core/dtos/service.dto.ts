import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

enum Type{
    QUAD = 'quad',
    PIRATE ='pirate',
    CAMEL = 'camel',
}
export class CreateServiceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ enum: Type })
    @IsEnum(Type)
    @IsNotEmpty()
    type: Type;

    @ApiProperty({ type: "string", format: "binary" })
    image: string[];

    @ApiPropertyOptional({ type: "string", format: "binary" })
    video: string;

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

export class UpdateServiceDto {
    @ApiPropertyOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional()
    @IsString()
    image: string[];

    @ApiPropertyOptional()
    @IsString()
    type: Type;

    @ApiPropertyOptional()
    @IsString()
    video: string;

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