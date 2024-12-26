import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/services";
import { BlogFactoryService } from "./blog-factory.service";
import { BlogUseCases } from "./blog.use-case";

@Module({
    imports: [
        DataServicesModule,
    ],
    providers: [BlogFactoryService, BlogUseCases],
    exports: [BlogFactoryService, BlogUseCases],
})
export class BlogUseCasesModule {}