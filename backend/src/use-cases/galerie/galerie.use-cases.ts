import { Injectable } from "@nestjs/common";
import { GalerieFactoryService } from "./galerie-factory.service";
import { CreateGalerieDto, Galerie, IDataServices, UpdateGalerieDto } from "src/core";
import { BASE_URL } from "src/configuration";

@Injectable()
export class GalerieUseCases{
    constructor(
        private readonly galerieFactoryService: GalerieFactoryService,
        private dataServices: IDataServices,

    ){}

    async createGalerie(createGalerieDto: CreateGalerieDto,
        file: Express.Multer.File[],
        video : Express.Multer.File[]
    ): Promise<Galerie> {

        try {
            createGalerieDto.images = file
            ? file.map((f) => `${BASE_URL}/uploads/${f.filename}`)
            : null;
            createGalerieDto.videos = video
            ? video.map((f) => `${BASE_URL}/uploads/${f.filename}`)
            : null;
            const newGalerieData = this.galerieFactoryService.createNewGalerie({ ...createGalerieDto });
            const newGalerie = await this.dataServices.galeries.create(newGalerieData);
            return newGalerie;
        } catch (error) {
            throw error;
        }
    }

    async getAllGaleries(): Promise<Galerie[]> {
        try {
            const galeries = await this.dataServices.galeries.findAllByAttribute("deletedAt", null);
            return galeries;
        } catch (error) {
            throw error;
        }
    }

    async updateGalerie(id: string, updateGalerieDto: UpdateGalerieDto, 
        file: Express.Multer.File[]): Promise<Galerie> {
        try {
            const galerie = await this.dataServices.galeries.get(id);
            if (!galerie) {
                throw new Error("Galerie not found.");
            }
            updateGalerieDto.images = file
            ? file.map((f) => `${BASE_URL}/uploads/${f.filename}`)
            : galerie.images;
            const updatedGalerieData = this.galerieFactoryService.updateGalerie(updateGalerieDto);
            const updatedGalerie = await this.dataServices.galeries.update(id, updatedGalerieData);
            return updatedGalerie;
        } catch (error) {
            throw error;
        }
    }
   
}