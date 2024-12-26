import { DataServicesModule, MailerServicesModule } from "src/services";
import { ReservationFactoryService } from "./reservation-factory.service";
import { ReservationUseCases } from "./reservation.use-case";
import { Module } from "@nestjs/common";

@Module({
    imports: [DataServicesModule,MailerServicesModule ],
    providers: [ReservationFactoryService, ReservationUseCases],
    exports: [ReservationFactoryService, ReservationUseCases],    
})
export  class ReservationUseCaseModule{}