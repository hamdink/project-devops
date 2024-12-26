import { Injectable } from "@nestjs/common";
import {  CreateReservationDto, Reservation, UpdateReservationDto } from "src/core";

@Injectable()
export class ReservationFactoryService {
    createNewReservation(createReservationDto: CreateReservationDto): Reservation {
        const newReservation = new Reservation();
        newReservation.userId = createReservationDto.userId;
        newReservation.date = createReservationDto.date;
        newReservation.heure = createReservationDto.heure;
        newReservation.hotel = createReservationDto.hotel;
        newReservation.NameOfParticipants = createReservationDto.NameOfParticipants;
        newReservation.childrens = createReservationDto.childrens;
        newReservation.activity = createReservationDto.activity;
        newReservation.nbPersonne = createReservationDto.nbPersonne;
        newReservation.status = "pending";
        newReservation.createdAt = new Date();
        newReservation.updatedAt = new Date();
        return newReservation;
    }


    updateReservation(updateReservationDto: UpdateReservationDto): Reservation {
        const updatedReservation = new Reservation();
         updatedReservation.date = updateReservationDto.date;
         updatedReservation.heure = updateReservationDto.heure;
         updatedReservation.hotel = updateReservationDto.hotel;
         updatedReservation.NameOfParticipants = updateReservationDto.NameOfParticipants;
         updatedReservation.childrens = updateReservationDto.childrens;
         updatedReservation.activity = updateReservationDto.activity;
         updatedReservation.nbPersonne = updateReservationDto.nbPersonne;
         updatedReservation.status = updateReservationDto.status;
        updatedReservation.updatedAt = new Date();
        return updatedReservation;
    }
}
