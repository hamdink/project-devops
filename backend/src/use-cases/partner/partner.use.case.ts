/* eslint-disable no-useless-catch */
import { Injectable } from '@nestjs/common';
import { PartnerFactoryService } from './partner-factory.service';
import { CreatePartnerDto, IDataServices, Partner, UpdatePartnerDto } from 'src/core';
import { BASE_URL } from 'src/configuration';


@Injectable()
export class PartnerUseCases{
    constructor(
        private readonly partnerFactoryService: PartnerFactoryService,
        private dataServices: IDataServices,
    ){}

    async createPartner(createPartnerDto: CreatePartnerDto,
        file: Express.Multer.File): Promise<Partner>{
        try{
            createPartnerDto.image = file
                ? `${BASE_URL}/uploads/${file.filename}`
                : null;
            const newPartnerData = this.partnerFactoryService.createNewPartner({ ...createPartnerDto });
            const newPartner = await this.dataServices.partners.create(newPartnerData);
            return newPartner;
        } catch (error){
            throw error;
        }
       

    }

    async getAllPartners(): Promise<Partner[]>{
        try{
            const partners = await this.dataServices.partners.findAllByAttribute('deletedAt', null);
            return partners;
        } catch (error){
            throw error;
        }
    }

    async getPartnerById(id: string): Promise<Partner>{
        try{
            const partner = await this.dataServices.partners.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            return partner;
        } catch (error){
            throw error;
        }
    }

    async updatePartner(id: string,
        updatePartnerDto: UpdatePartnerDto,
        file: Express.Multer.File) : Promise<Partner>{
        try{
            updatePartnerDto.image = file
            ? `${BASE_URL}/uploads/${file.filename}`
            : null;
            const partner = await this.dataServices.partners.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            if (!partner){
                throw new Error('Partner not found');
            }
            const updatedPartnerData = this.partnerFactoryService.updatePartner({ ...updatePartnerDto });
            const updatedPartner = await this.dataServices.partners.update(id, updatedPartnerData);
            return updatedPartner;
        } catch (error){
            throw error;
        }
    }

    async deletePartner(id: string): Promise<boolean>{
        try{
            const partner = await this.dataServices.partners.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            if (!partner){
                throw new Error('Partner not found');
            }
            const deletedPartner = await this.dataServices.partners.delete(id);
            return deletedPartner ? true : false;
        } catch (error){
            throw error;
        }
    }

  
}
