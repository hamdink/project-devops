import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type ServiceDocument = Service & Document;


@Schema()
export class Service {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop()
    image: string[];

    @Prop()
    type: string;

    @Prop()
    video: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    deletedAt: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);