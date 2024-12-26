import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { GalerieUseCases } from "src/use-cases/galerie/galerie.use-cases";
import { Body, Controller, Post, Get, Put,Param } from "@nestjs/common";
import { CreateGalerieDto } from "src/core";
import {  FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { imageAndPdfFilter, storage } from "src/configuration/multer.config";
import { UploadedFiles } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";

@ApiTags("api/galerie")
@Controller("api/galerie")
export class GalerieController {
  constructor(private readonly galerieUseCases: GalerieUseCases) {}

  @ApiConsumes("multipart/form-data")
    @Post()
    @UseInterceptors(
      FileFieldsInterceptor([
          { name: 'images', maxCount: 10 },
          { name: 'videos', maxCount: 10 },
      ], {
          storage: storage,
          fileFilter: imageAndPdfFilter,
      }),
  )
    
  async createGalerie(
    @Body() galerieDto: CreateGalerieDto,
    @UploadedFiles() files: { images?: Express.Multer.File[], videos?: Express.Multer.File[] },
  ){
    const images = files.images ? files.images : [];
    const videos = files.videos ? files.videos : [];
    return this.galerieUseCases.createGalerie({ ...galerieDto }, images, videos);
  }

  @Get()
    async getAllGaleries() {
        return this.galerieUseCases.getAllGaleries();
    }

    @Put(":id")
    @UseInterceptors(
        FilesInterceptor("images", 10, {
            storage: storage,
            fileFilter: imageAndPdfFilter,
        }),
    )

    async updateGalerie(
        @Param("id") id: string,
        @Body() updateGalerieDto: CreateGalerieDto,
        @UploadedFiles() images: Express.Multer.File[]
    ) {
        return this.galerieUseCases.updateGalerie(id, updateGalerieDto, images);
    }
  
}