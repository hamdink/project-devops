import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IDataServices, User } from "../../../core";
import { DATA_BASE_CONFIGURATION } from "../../../configuration";
import {
 
  
  Blog,
  BlogSchema,
  Contact,
  ContactSchema,
  Faq,
  FaqSchema,
  Galerie,
  GalerieSchema,
  Notification,
  NotificationSchema,
  Partner,
  PartnerSchema,
  Reservation,
  ReservationSchema,
  Review,
  ReviewSchema,
  Service,
  ServiceSchema,
  UserSchema,

} from "./model";
import { MongoDataServices } from "./mongo-data-services.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Service.name, schema: ServiceSchema},
      {name: Faq.name, schema: FaqSchema},
      {name: Blog.name, schema: BlogSchema},
      {name: Partner.name, schema: PartnerSchema},
      {name: Contact.name, schema: ContactSchema},
      {name: Galerie.name, schema: GalerieSchema},
      {name: Reservation.name, schema: ReservationSchema},
      {name: Review.name, schema: ReviewSchema},
     
    ]),

    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString, {
      dbName: "Ali_Baba",
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
