import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
export class Children{

    name: string;
    age: string;
}

export class Participant{
    name: string;
}

export enum Status{
    pending = "pending",
    confirmed = "confirmed",
    canceled = "canceled",
}

enum Activity{
    Boat_Tour= "Boat_Tour",
    Quad_Biking= "Quad_Biking",
    Camel_Ride= "Camel_Ride",
}
export class CreateReservationDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    heure: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    hotel: string;

    @ApiProperty({ type: [Participant] })
    @IsArray()
    @IsNotEmpty()
    NameOfParticipants: Participant[];

    @ApiProperty({ type: [Children] })
    @IsArray()
    @IsNotEmpty()
    childrens: Children[];

    @ApiProperty({ enum: Activity })
    @IsEnum(Activity)
    @IsNotEmpty()
    activity: Activity[];


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nbPersonne: number;

    @ApiProperty({ enum: Status })
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;;

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

export class UpdateReservationDto{ 


    @ApiPropertyOptional()
    @IsString()
    date: string;

    @ApiPropertyOptional()
    @IsString()
    heure: string;

    @ApiPropertyOptional()
    @IsString()
    hotel: string;

    @ApiPropertyOptional({ type: [Participant] })
    @IsArray()
    NameOfParticipants: Participant[];

    @ApiPropertyOptional({ type: [Children] })
    @IsArray()
    childrens: Children[];

    @ApiPropertyOptional({ enum: Activity })
    @IsString()
    activity: Activity[];

    @ApiPropertyOptional()
    @IsString()
    nbPersonne: number;

    @ApiPropertyOptional({ enum: Status })
    @IsEnum(Status)
    status: Status;;

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