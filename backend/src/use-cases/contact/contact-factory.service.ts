import { Injectable } from "@nestjs/common";
import { Contact, CreateContactDto, UpdateContactDto } from "src/core";

@Injectable()
export class ContactFactoryService {
    createNewContact(createContactDto: CreateContactDto) {
        const newContact = new Contact();
      
        newContact.firstName = createContactDto.firstName;
        newContact.lastName = createContactDto.lastName;
        newContact.phone = createContactDto.phone;
        newContact.objet = createContactDto.objet;
        newContact.email = createContactDto.email;
        newContact.message = createContactDto.message;
        newContact.createdAt = new Date();
        return newContact;
    }

    updateContact(updateContactDto: UpdateContactDto) {
        const updatedContact = new Contact();
        updatedContact.firstName = updateContactDto.firstName;
        updatedContact.lastName = updateContactDto.lastName;
        updatedContact.phone = updateContactDto.phone;
        updatedContact.objet = updateContactDto.objet;
        updatedContact.email = updateContactDto.email;
        updatedContact.message = updateContactDto.message;
        updatedContact.updatedAt = new Date();

        return updatedContact;
    }
}
