import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/services";
import { ReviewFactoryService } from "./review-factory.service";
import { ReviewUseCases } from "./review.use-case";

@Module({
    imports: [DataServicesModule],
    providers: [ReviewFactoryService, ReviewUseCases],
    exports: [ReviewFactoryService, ReviewUseCases],  
})
      

export class ReviewUseCasesModule{}