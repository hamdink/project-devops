import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateFaqDto, Faq } from 'src/core';
import { JwtAuthGuard } from 'src/core/guards/jwtauth.guard';
import { Roles } from 'src/core/roles/role.decorator';
import { Role } from 'src/core/roles/role.enum';
import { RolesGuard } from 'src/core/roles/roles.guard';
import {  FaqUseCases } from 'src/use-cases/faq/faq.use-case';

@ApiTags("api/faq")
@Controller('api/faq')
export class FaqController {
    constructor(private readonly faqUseCases: FaqUseCases) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Post()
    async createFaq(@Body() faq: CreateFaqDto): Promise<Faq> {
        return this.faqUseCases.createFaq({...faq});
    }

    @Get()
    async getAllFaqs(): Promise<Faq[]> {
        return this.faqUseCases.getAllFaqs();
    }

    @Get(':id')
    async getFaqById(@Param('id') id: string): Promise<Faq> {
        return this.faqUseCases.getFaqById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Put(':id')
    async updateFaq(@Param('id') id: string, @Body() faq: CreateFaqDto): Promise<Faq> {
        return this.faqUseCases.updateFaq(id, faq);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteFaq(@Param('id') id: string): Promise<boolean> {
        return this.faqUseCases.deleteFaq(id);
    }
}
