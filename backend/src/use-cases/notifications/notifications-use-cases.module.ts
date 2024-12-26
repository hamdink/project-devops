import { Module } from "@nestjs/common";
import { NotificationsFactoryService } from "./notifications-factory.service";
import { NotificationsUseCases } from "./notifications.use-case";
import { NotificationsGateway } from "src/frameworks/socket/socket-services.service";
import { SocketModule } from "src/frameworks/socket/socket-services.module";
import { DataServicesModule } from "src/services";

@Module({
  imports: [ SocketModule,DataServicesModule],
  providers: [
    NotificationsFactoryService,
    NotificationsUseCases,
    NotificationsGateway,
  ],
  exports: [
    NotificationsFactoryService,
    NotificationsUseCases,
    NotificationsGateway,
  ],
})
export class NotificationsUseCasesModule {}
