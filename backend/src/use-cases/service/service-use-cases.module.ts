import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/services";
import { ServiceFactoryService } from "./service-factory.service";
import { ServiceUseCases } from "./service.use-case";

@Module({
    imports: [DataServicesModule],
    providers: [ServiceFactoryService, ServiceUseCases],
    exports: [ServiceFactoryService, ServiceUseCases],    
})
export class ServiceUseCasesModule {}