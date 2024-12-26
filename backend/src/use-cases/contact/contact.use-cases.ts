import { Injectable } from '@nestjs/common';
import { ContactFactoryService } from './contact-factory.service';
import { Contact, CreateContactDto, IDataServices } from 'src/core';

@Injectable()
export class ContactUseCases{
    constructor(
        private readonly contactFactoryService: ContactFactoryService,
        private dataServices: IDataServices,

    ) {}

    async createContact(createContactDto: CreateContactDto): Promise<Contact> {
        try {
            const newContactData = this.contactFactoryService.createNewContact({ ...createContactDto });
            const newContact = await this.dataServices.contacts.create(newContactData);
            return newContact;
        } catch (error) {
            throw error;
        }
    }

    async getAllContacts(): Promise<Contact[]> {
        try {
            const contacts = await this.dataServices.contacts.findAllByAttribute('deletedAt', null);
            return contacts;
        } catch (error) {
            throw error;
        }
    }

    async getContactById(id: string): Promise<Contact> {
        try {
            const contact = await this.dataServices.contacts.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            return contact;
        } catch (error) {
            throw error;
        }
    }

    async updateContact(id: string, updateContactDto: CreateContactDto): Promise<Contact> {
        try {
            const contact = await this.dataServices.contacts.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            if (!contact) {
                throw new Error('Contact not found');
            }
            const updatedContactData = this.contactFactoryService.updateContact({ ...updateContactDto });
            const updatedContact = await this.dataServices.contacts.update(id, updatedContactData);
            return updatedContact;
        } catch (error) {
            throw error;
        }
    }

    async deleteContact(id: string): Promise<boolean> {
        try {
            const contact = await this.dataServices.contacts.get(
                {
                    _id: id,
                    deletedAt: null,
                },
            );
            if (!contact) {
                throw new Error('Contact not found');
            }
            const deletedContact = await this.dataServices.contacts.delete(id);
            return deletedContact ? true : false;
        } catch (error) {
            throw error;
        }
    }
}
