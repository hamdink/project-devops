import { Injectable } from "@nestjs/common";
import { CreatePartnerDto, Partner, UpdatePartnerDto } from "src/core";

@Injectable()
export class PartnerFactoryService {
    createNewPartner(createPartner: CreatePartnerDto){
        const newPartner = new Partner();
        newPartner.link = createPartner.link;
        newPartner.image = createPartner.image;
        newPartner.description = createPartner.description;
        newPartner.location = createPartner.location;
        newPartner.createdAt = new Date();
        return newPartner;
    }

    updatePartner(updatePartner: UpdatePartnerDto){
        const updatedPartner = new Partner();
        updatedPartner.link = updatePartner.link;
        updatedPartner.image = updatePartner.image;
        updatedPartner.description = updatePartner.description;
        updatedPartner.location = updatePartner.location;
        updatedPartner.updatedAt = new Date();

        return updatedPartner;
    }
}
