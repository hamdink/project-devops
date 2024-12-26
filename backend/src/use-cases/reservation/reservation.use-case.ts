/* eslint-disable no-useless-catch */
import { BadRequestException, Injectable } from "@nestjs/common";
import { ReservationFactoryService } from "./reservation-factory.service";
import { AbstractMailerService, CreateReservationDto, IDataServices, Reservation, Status } from "src/core";
import { generateReservationEmailContent } from "src/core/mailerTemplates/reservationTemplate";
import { generateConfirmationEmailContent } from "src/core/mailerTemplates/confirmationReservationTemplate";

@Injectable()
export class ReservationUseCases{
    constructor(
        private readonly reservationFactoryService: ReservationFactoryService,
        private readonly mailerService: AbstractMailerService,
        private dataServices: IDataServices
    ){ }
    async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
        try {
          createReservationDto.childrens.forEach(child => {
            const childAge = Number(child.age);
            if (childAge > 12) {
              throw new BadRequestException(`The child ${child.name} is over 12 years old and cannot be included in the booking.`);
            }
          });
      
          const newReservationData = this.reservationFactoryService.createNewReservation(createReservationDto);
          const newReservation = await this.dataServices.reservations.create(newReservationData);
          const user = await this.dataServices.users.get({ _id: newReservation.userId });
      
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const participants: any[] = [
            ...createReservationDto.NameOfParticipants.map(name => ({ name })), 
            ...createReservationDto.childrens.map(child => ({ name: child.name })) 
          ];
      
          const subject = 'Confirmation de demande de réservation';
          const htmlContent = generateReservationEmailContent(
            user.firstName,
            'Ali Baba',
            createReservationDto.activity,
            createReservationDto.date,
            createReservationDto.heure,
            participants,
            'contact@touristiquealibaba.com'
          );
      
          await this.mailerService.sendEmail(user.email, subject, htmlContent);
      
          return newReservation;
        } catch (error) {
          throw error;
        }
      }
      
      async getAllReservations(page: number, limit: number): Promise<Reservation[]> {
        try {
            const offset = (page - 1) * limit;
            console.log("offset", offset)
            const reservations = await this.dataServices.reservations.findAllByAttributes({
               deletedAt: null
               
            });

            const pagination = reservations.slice(offset,limit)
    
            return pagination
            
            
        } catch (error) {
            throw error;
        }
    }
    


    async updateReservation(id: string, updateReservationDto: CreateReservationDto): Promise<Reservation> {
        try {
            const reservation = await this.dataServices.reservations.get({
                _id: id,
                deletedAt: null
            });
            if (!reservation) {
                throw new Error("Reservation not found");
            }
    
            const reservationDate = new Date(reservation.date);
    
            const formattedTime = reservation.heure.padStart(2, '0') + ":00";
    
            const reservationDateTime = new Date(`${reservationDate.toISOString().split('T')[0]}T${formattedTime}`);
    
            const currentTime = new Date();
    
            const timeDifference = reservationDateTime.getTime() - currentTime.getTime();
    
            if (timeDifference < 48 * 60 * 60 * 1000) { 
                throw new BadRequestException("Cannot update or cancel reservation within 48 hours of the activity.");
            }
    
            const updatedReservationData = this.reservationFactoryService.updateReservation(updateReservationDto);
            const updatedReservation = await this.dataServices.reservations.update(id, updatedReservationData);
    
            return updatedReservation;
        } catch (error) {
            throw error;
        }
    }
    

    async deleteReservation(id: string): Promise<boolean> {
        try {
            const reservation = await this.dataServices.reservations.get({
                _id: id,
                deletedAt: null
            });
            if (!reservation) {
                throw new Error("Reservation not found");
            }
    
            const reservationDate = new Date(reservation.date);
    
            const formattedTime = reservation.heure.padStart(2, '0') + ":00";
    
            const reservationDateTime = new Date(`${reservationDate.toISOString().split('T')[0]}T${formattedTime}`);
            console.log("reservationDateTime", reservationDateTime);
    
            const currentTime = new Date();
    
            const timeDifference = reservationDateTime.getTime() - currentTime.getTime();
    
            if (timeDifference < 48 * 60 * 60 * 1000) { 
                throw new BadRequestException("Cannot update or cancel reservation within 48 hours of the activity.");
            }
    
            reservation.status = Status.canceled;
            reservation.deletedAt = new Date();
            await this.dataServices.reservations.update(id, reservation);
    
            await this.dataServices.reservations.delete(id);
    
            return true;
        } catch (error) {
            throw error;
        }
    }
    
    

    async getReservation(id: string): Promise<Reservation> {
        try {
            const reservation = await this.dataServices.reservations.get({_id:id, deletedAt: null});
            if (!reservation) {
                throw new Error("Reservation not found");
            }
            return reservation;
        } catch (error) {
            throw error;
        }
    }

    async getReservationByUserId(userId: string, page: number, limit: number ): Promise<Reservation[]> {
        try {
            const offset = (page - 1) * limit;
            const reservations = await this.dataServices.reservations.findAllByAttributes({'userId':userId, 'deletedAt': null});
            if (!reservations) {
                throw new Error("Reservation not found");
            }
            const sortedReservations = reservations.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            const pagination = sortedReservations.slice(offset,limit)
            return pagination;
        } catch (error) {
            throw error;
        }
    }

    async updateReservationStatus(id: string): Promise<Reservation> {
        try {
            const reservation = await this.dataServices.reservations.get({ _id: id, deletedAt: null });
            if (!reservation) {
                throw new Error("Reservation not found");
            }
    
            reservation.status = Status.confirmed;
            const updatedReservation = await this.dataServices.reservations.update(id, reservation);
    
            const user = await this.dataServices.users.get({ _id: reservation.userId });
    
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const participants: any[] = [
              ...reservation.NameOfParticipants.map(name => ({ name })),
              ...reservation.childrens.map(child => ({ name: child.name }))
            ];
    
            const subject = 'Confirmation de votre réservation';
            const htmlContent = generateConfirmationEmailContent(
                user.firstName,
                'Ali Baba',
                reservation.activity, 
                reservation.date,
                reservation.heure,
                participants, 
                'contact@touristiquealibaba.com'
            );
    
            await this.mailerService.sendEmail(user.email, subject, htmlContent);
    
            return updatedReservation;
        } catch (error) {
            throw error;
        }
    }
    


}