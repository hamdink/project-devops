import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/services";
import { FaqFactoryService } from "./faq-factory.service";
import { FaqUseCases } from "./faq.use-case";

@Module({
    imports: [
        DataServicesModule,
    ],
    providers: [FaqFactoryService, FaqUseCases],
    exports: [FaqFactoryService, FaqUseCases],
})

export class FaqUseCasesModule {}