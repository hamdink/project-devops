import { Injectable } from '@nestjs/common';
import { FaqFactoryService } from './faq-factory.service';
import { CreateFaqDto, Faq, IDataServices } from 'src/core';

@Injectable()
export class FaqUseCases {
    constructor(
        private readonly faqFactoryService: FaqFactoryService,
        private dataServices: IDataServices,
    ) {}
    
    async createFaq(createFaqDto: CreateFaqDto): Promise<Faq> {
        try {
            const newFaqData = this.faqFactoryService.createNewFaq({ ...createFaqDto });
            const newFaq = await this.dataServices.faqs.create(newFaqData);
            return newFaq;
        } catch (error) {
            throw error;
        }
    }

    async getAllFaqs(): Promise<Faq[]> {
        try {
            const faqs = await this.dataServices.faqs.findAllByAttribute('deletedAt', null);
            return faqs;
        } catch (error) {
            throw error;
        }
    }

    async getFaqById(id: string): Promise<Faq> {
        try {
            const faq = await this.dataServices.faqs.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            return faq;
        } catch (error) {
            throw error;
        }
    }

    async updateFaq(id: string, updateFaqDto: CreateFaqDto): Promise<Faq> {
        try {
            const faq = await this.dataServices.faqs.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            if (!faq) {
                throw new Error('Faq not found');
            }
            const updatedFaqData = this.faqFactoryService.updateFaq({ ...updateFaqDto });
            const updatedFaq = await this.dataServices.faqs.update(id, updatedFaqData);
            return updatedFaq;
        } catch (error) {
            throw error;
        }
    }

    async deleteFaq(id: string): Promise<boolean> {
        try {
            const faq = await this.dataServices.faqs.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            if (!faq) {
                throw new Error('Faq not found');
            }
            const deletedFaq = await this.dataServices.faqs.delete(id);
            return deletedFaq ? true : false;
        } catch (error) {
            throw error;
        }
    }
}