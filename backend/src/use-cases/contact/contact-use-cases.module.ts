import { Module } from "@nestjs/common";

import { DataServicesModule } from "src/services";
import { ContactFactoryService } from "./contact-factory.service";
import { ContactUseCases } from "./contact.use-cases";

@Module({
    imports: [
        DataServicesModule,
    ],
    providers: [ContactFactoryService, ContactUseCases],
    exports: [ContactFactoryService, ContactUseCases],
})

export class ContactUseCasesModule {}