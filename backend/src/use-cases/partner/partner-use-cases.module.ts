import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/services";
import { PartnerFactoryService } from "./partner-factory.service";
import { PartnerUseCases } from "./partner.use.case";

@Module({
    imports: [
        DataServicesModule,
    ],
    providers: [PartnerFactoryService, PartnerUseCases],
    exports: [PartnerFactoryService, PartnerUseCases],
})

export class PartnerUseCasesModule {}