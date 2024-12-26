import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
 
export type FaqDocument = Faq & Document;
@Schema()
export class Faq {
    @Prop({required: true})
    question: string;

    @Prop({required: true})
    answer: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    deletedAt: Date;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);