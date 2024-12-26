/* eslint-disable no-useless-catch */
import { Injectable } from "@nestjs/common";
import { ServiceFactoryService } from "./service-factory.service";
import { CreateServiceDto, IDataServices, Service, UpdateServiceDto } from "src/core";
import { BASE_URL } from "../../configuration";


@Injectable()
export class ServiceUseCases{
    constructor(private serviceFactoryService: ServiceFactoryService,
        private dataServices: IDataServices,
        ) {}

    async createService(createServiceDto: CreateServiceDto,
        file: Express.Multer.File[],
        ): Promise<Service> {
        try {
            createServiceDto.image = file
            ? file.map((f) => `${BASE_URL}/uploads/${f.filename}`)
            : null;
            
            
            const newServiceData = this.serviceFactoryService.createNewService({...createServiceDto});
            const newService = await this.dataServices.services.create(newServiceData);
            return newService;
        } catch (error) {
            throw error;
        }
    }

    async getAllServices(): Promise<Service[]> {
        try {
            const services = await this.dataServices.services.findAllByAttribute('deletedAt', null);
            return services;
        } catch (error) {
            throw error;
        }
    }

    async getServiceById(id: string): Promise<Service> {
        try {
            const service = await this.dataServices.services.get(
               {
                     _id: id,
                     deletedAt: null
               }
            );
            return service;
        } catch (error) {
            throw error;
        }
    }


    async updateService(id: string, 
        updateServiceDto: UpdateServiceDto,
        file: Express.Multer.File[]): Promise<Service> {
        try {
            const service = await this.dataServices.services.get(
                {
                    _id: id,
                    deletedAt: null
                }
            );
            if (!service) {
                throw new Error("Service not found");
            }
            updateServiceDto.image =  file ? file.map((f) => `${BASE_URL}/uploads/${f.filename}`)
            : null;

            const updatedService = this.serviceFactoryService.updateService(updateServiceDto);
            return  this.dataServices.services.update(id, updatedService);
        } catch (error) {
            throw error;
        }
    }
    

    async deleteService(id: string): Promise<boolean> {
        try {
            const service = await this.dataServices.services.get(
                {
                    _id: id,
                    deletedAt: null
                }
            );
            if (!service) {
                throw new Error("Service not found");
            }
            const deletedService =  await this.dataServices.services.delete(id);
            return deletedService ? true : false;
        } catch (error) {
            throw error;
        }
    }
}