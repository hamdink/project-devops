import { CreateServiceDto, Service, UpdateServiceDto } from "src/core";
import { ServiceUseCases } from "src/use-cases/service/service.use-case";
import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    
    Get,
    Param,
    Delete,
    Put,
    UseGuards,
    UploadedFiles

  } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { imageAndPdfFilter, storage } from "src/configuration/multer.config";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/guards/jwtauth.guard";
import { RolesGuard } from "src/core/roles/roles.guard";
import { Roles } from "src/core/roles/role.decorator";
import { Role } from "src/core/roles/role.enum";

@ApiTags("api/service")
@Controller("api/service")
export class ServiceController {
    constructor(
        private readonly serviceUseCases: ServiceUseCases,
    ) {}
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    // @Roles(Role.Admin)
    @ApiConsumes("multipart/form-data")
    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'image', maxCount: 10 },
          
        ], {
            storage: storage,
            fileFilter: imageAndPdfFilter,
        }),
    )
    async createService(
        @Body() service: CreateServiceDto,
        @UploadedFiles() files: { image?: Express.Multer.File[] },
    ): Promise<Service> {
        const imageFile = files.image ? files.image: [];
      

        return this.serviceUseCases.createService({ ...service }, imageFile);
    }


    @Get()
    async getAllServices(): Promise<Service[]> {
        return this.serviceUseCases.getAllServices();
    }

    @Get(":id")
    async getServiceById(@Param("id") id: string): Promise<Service> {
        return this.serviceUseCases.getServiceById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Put(":id")
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'image', maxCount: 10 },
           
        ], {
            storage: storage,
            fileFilter: imageAndPdfFilter,
        }),
    )

    async updateService(@Param("id") id: string,
    @Body() service: UpdateServiceDto,
    @UploadedFiles() files: { image?: Express.Multer.File[]},
    ): Promise<Service> {
        const imageFile = files.image ? files.image: [];

        return this.serviceUseCases.updateService(id, { ...service }, imageFile);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Delete(":id")
    async deleteService(@Param("id") id: string): Promise<boolean> {
        return this.serviceUseCases.deleteService(id);
    }

}