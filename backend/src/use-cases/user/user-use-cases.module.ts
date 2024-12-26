import { Module } from "@nestjs/common";
import { UserFactoryService } from "./user-factory.service";
import { UserUseCases } from "./user.use-case";
import { BcryptModule } from "../../frameworks/bcrypt/bcrypt-services.module";
import { DataServicesModule } from "src/services";


@Module({
  imports: [
    DataServicesModule,
    BcryptModule,
  ],
  providers: [UserFactoryService, UserUseCases],
  exports: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}
