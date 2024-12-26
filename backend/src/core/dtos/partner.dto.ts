import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

enum Location{
    SOUSSE = 'sousse',
    MONASTIR = 'monastir',
}
export class CreatePartnerDto{
    @ApiPropertyOptional()
    link: string;

    @ApiProperty({ enum: Location })
    @IsEnum(Location)
    @IsNotEmpty()
    location: Location;

    @ApiPropertyOptional()
    description: string;

    @ApiProperty({ type: "string", format: "binary" })
    image: string;

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

export class UpdatePartnerDto{ 
    @ApiPropertyOptional()
    @IsString()
    link: string;

    @ApiPropertyOptional({ enum: Location })
    location: Location;

    @ApiPropertyOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional()
    @IsString()
    image: string;

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