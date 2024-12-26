import { Injectable } from "@nestjs/common";
import { CreateGalerieDto, Galerie, UpdateGalerieDto } from "src/core";

@Injectable()
export class GalerieFactoryService {
    createNewGalerie(createGalerieDto: CreateGalerieDto) {
        const newGalerie = new Galerie();
        newGalerie.images = createGalerieDto.images;
        newGalerie.videos = createGalerieDto.videos;
        newGalerie.createdAt = new Date();
      
        return newGalerie;
    }

    updateGalerie(updateGalerieDto:UpdateGalerieDto ) {
        const updatedGalerie = new Galerie();
        updatedGalerie.images = updateGalerieDto.images;
        updatedGalerie.videos = updateGalerieDto.videos;
        updatedGalerie.updatedAt = new Date();
        return updatedGalerie;
    }
}