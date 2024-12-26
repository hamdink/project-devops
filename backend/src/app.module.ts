import { Module } from "@nestjs/common";

import { UserUseCasesModule } from "./use-cases/user/user-use-cases.module";
import { BcryptServicesModule } from "./services";
import { LoginUseCasesModule } from "./use-cases/login/login-use-cases.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./core/strategy/jwt.stratgy";
import { NotificationsUseCasesModule } from "./use-cases/notifications/notifications-use-cases.module";
import { NotificationsController } from "./controllers/notifications.controller";
import { SocketModule } from "./frameworks/socket/socket-services.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ScheduleModule } from "@nestjs/schedule";
import { CronJobModule } from "./frameworks/cronJob/cron-services.module";
import { UserController } from "./controllers/user.contoller";
import { LoginController } from "./controllers/login.controller";
import { join } from 'path';
import { ServiceController } from "./controllers/service.controller";
import { ServiceUseCasesModule } from "./use-cases/service/service-use-cases.module";
import { FaqUseCasesModule } from "./use-cases/faq/faq-use-cases.module";
import { FaqController } from "./controllers/faq.controller";
import { BlogUseCasesModule } from "./use-cases/blog/blog-use-cases.module";
import { BlogController } from "./controllers/blog.controller";
import { PartnerUseCasesModule } from "./use-cases/partner/partner-use-cases.module";
import { PartnerController } from "./controllers/partner.controller";

import { ContactUseCasesModule } from "./use-cases/contact/contact-use-cases.module";
import { ContactController } from "./controllers/contact.controller";
import { Galerie, Review } from "./core";
import { GalerieUseCasesModule } from "./use-cases/galerie/galerie-use-cases.module";
import { GalerieController } from "./controllers/galerie.controller";
import { ReservationUseCaseModule } from "./use-cases/reservation/reservation-use-cases.module";
import { ReservationController } from "./controllers/reservation.controller";
import { ReviewUseCasesModule } from "./use-cases/review/review-use-cases.module";
import { ReviewController } from "./controllers/review.controller";


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    PassportModule,
    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "1d" },
    }),

    UserUseCasesModule,
    BcryptServicesModule,
    LoginUseCasesModule,
    NotificationsUseCasesModule,
    SocketModule,
    CronJobModule,
    ServiceUseCasesModule,
    FaqUseCasesModule,
    BlogUseCasesModule,
    PartnerUseCasesModule,
    ContactUseCasesModule,
    GalerieUseCasesModule,
    ReservationUseCaseModule,
    ReviewUseCasesModule,
  ],
  providers: [JwtStrategy],
  controllers: [
    UserController,
    LoginController,
    NotificationsController,
    ServiceController,
    FaqController,
    BlogController,
    PartnerController,
    ContactController,
    GalerieController,
    ReservationController,
    ReviewController,
  
  ],
})
export class AppModule {}
