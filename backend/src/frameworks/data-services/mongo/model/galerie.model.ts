import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GalerieDocument = Galerie & Document;

@Schema()
export class Galerie{
    @Prop({required: true})
    images: string[];

    @Prop({required: true})
    videos: string[];

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    deletedAt: Date;
}

export const GalerieSchema = SchemaFactory.createForClass(Galerie);