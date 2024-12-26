import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { imageAndPdfFilter, storage } from "src/configuration/multer.config";
import { CreatePartnerDto, Partner, UpdatePartnerDto } from "src/core";
import { JwtAuthGuard } from "src/core/guards/jwtauth.guard";
import { Roles } from "src/core/roles/role.decorator";
import { Role } from "src/core/roles/role.enum";
import { RolesGuard } from "src/core/roles/roles.guard";
import { PartnerUseCases } from "src/use-cases/partner/partner.use.case";

@ApiTags("api/partner")
@Controller('api/partner')
export class PartnerController {
    constructor(
        private readonly partnerUseCases: PartnerUseCases,
    ) {}

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    // @Roles(Role.Admin)
    @ApiConsumes("multipart/form-data")
    @Post()
    @UseInterceptors(
      FileInterceptor("image", {
        storage: storage,
        fileFilter: imageAndPdfFilter,
      }),
    )
    async createPartner(
        @Body() partnerDto: CreatePartnerDto,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Partner>{
        return this.partnerUseCases.createPartner({...partnerDto}, file);
    }

    @Get()
    async getAllPartners(): Promise<Partner[]> {
        return this.partnerUseCases.getAllPartners();
    }

    @Get(":id")
    async getPartnerById(@Param("id") id: string): Promise<Partner> {
        return this.partnerUseCases.getPartnerById(id);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Put(':id')
    @UseInterceptors(
      FileInterceptor("image", {
        storage: storage,
        fileFilter: imageAndPdfFilter,
      }),
    )

    async updatePartner(
        @Param("id") id: string,
        @Body() partnerDto: UpdatePartnerDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Partner> {
        return this.partnerUseCases.updatePartner(id, partnerDto, file);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Delete(':id')
    async deletePartner(@Param('id') id: string): Promise<boolean> {
        return this.partnerUseCases.deletePartner(id);
    }
    

}