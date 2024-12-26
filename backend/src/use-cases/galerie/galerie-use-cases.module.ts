import { DataServicesModule } from "src/services";
import { GalerieFactoryService } from "./galerie-factory.service";
import { GalerieUseCases } from "./galerie.use-cases";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        DataServicesModule,
    ],
    providers: [GalerieFactoryService, GalerieUseCases],
    exports: [GalerieFactoryService, GalerieUseCases],
})

export class GalerieUseCasesModule {}