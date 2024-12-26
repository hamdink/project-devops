import { Injectable } from "@nestjs/common";
import { CreateServiceDto, Service, UpdateServiceDto } from "src/core";

@Injectable()
export class ServiceFactoryService {
    createNewService(createService: CreateServiceDto) {
        const newService = new Service();
        newService.name = createService.name;
        newService.description = createService.description;
        newService.image = createService.image;
        newService.video = createService.video;
        newService.type = createService.type;
        newService.createdAt = new Date();
        newService.updatedAt = new Date();
        return newService;
    }

    updateService(updateService: UpdateServiceDto) {
        const updatedService = new Service();
        updatedService.name = updateService.name;
        updatedService.description = updateService.description;
        updatedService.image = updateService.image;
        updatedService.video = updateService.video;
        updatedService.type = updateService.type;
        updatedService.updatedAt = new Date();
        return updatedService;
    }
   
}