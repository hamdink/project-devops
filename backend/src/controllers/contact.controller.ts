import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Contact, CreateContactDto, UpdateContactDto } from "src/core";
import { JwtAuthGuard } from "src/core/guards/jwtauth.guard";
import { Roles } from "src/core/roles/role.decorator";
import { Role } from "src/core/roles/role.enum";
import { RolesGuard } from "src/core/roles/roles.guard";
import { ContactUseCases } from "src/use-cases/contact/contact.use-cases";

@ApiTags("api/contact")
@Controller("api/contact")
export class ContactController {
    constructor(
        private readonly contactUseCases: ContactUseCases,
    ) {}

    
  
    @Post()
    async createContact(
        @Body() contactDto: CreateContactDto,
    ): Promise<Contact>{
        return this.contactUseCases.createContact({...contactDto});
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Get()
    async getAllContacts(): Promise<Contact[]> {
        return this.contactUseCases.getAllContacts();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Get(":id")
    async getContactById(@Param("id") id: any): Promise<Contact> {
        return this.contactUseCases.getContactById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Put(":id")
    async updateContact(
        @Param("id") id: any,
        @Body() contactDto: UpdateContactDto,
    ): Promise<Contact> {
        return this.contactUseCases.updateContact(id, contactDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Delete(":id")
    async deleteContact(@Param("id") id: any): Promise<boolean> {
        return this.contactUseCases.deleteContact(id);
    }
}
