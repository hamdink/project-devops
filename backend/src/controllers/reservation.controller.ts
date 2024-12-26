import { Body, Controller, Post, UseGuards, Get, Put, Param, Delete,Query} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateReservationDto, Reservation } from "src/core";
import { JwtAuthGuard } from "src/core/guards/jwtauth.guard";
import { RolesGuard } from "src/core/roles/roles.guard";
import { ReservationUseCases } from "src/use-cases/reservation/reservation.use-case";

@ApiTags("api/reservation")
@Controller("api/reservation")  
export class ReservationController{

    constructor(
        private reservationUseCases: ReservationUseCases,
    ){}

     @UseGuards(JwtAuthGuard, RolesGuard)
     @ApiBearerAuth()
    @Post()
    async createReservation(@Body() reservation: CreateReservationDto): Promise<Reservation> {
        return this.reservationUseCases.createReservation({...reservation});
    }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @ApiBearerAuth()
    @Get()
    async getAllReservations(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Reservation[]> {
        return this.reservationUseCases.getAllReservations(page, limit);
    }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @ApiBearerAuth()
    @Get(":id")
    async getReservation(@Param('id')id: string): Promise<Reservation> {
        return this.reservationUseCases.getReservation(id);
    }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @ApiBearerAuth()
    @Put(":id")
    async updateReservation(@Param("id") id: string,@Body() reservation: CreateReservationDto): Promise<Reservation> {
        return this.reservationUseCases.updateReservation(id, reservation);
    }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @ApiBearerAuth()
    @Delete(":id")
    async deleteReservation(@Param("id") id: string): Promise<boolean> {
        return this.reservationUseCases.deleteReservation(id);
    }

    @Get("user/:userId")
    async getReservationsByUser(@Param("userId") userId: string,
    @Query('page') page: number, 
    @Query('limit') limit: number): Promise<Reservation[]> {
        return this.reservationUseCases.getReservationByUserId(userId, page, limit);
    }

    @Put("status/:id")
    async updateReservationStatus(@Param("id") id: string): Promise<Reservation> {
        return this.reservationUseCases.updateReservationStatus(id);
    }


}