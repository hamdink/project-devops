import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    fullName: string;

    @Prop({required: true})
    message: string;

    @Prop({required: true})
    image: string;
     
    @Prop()
    status : string;

    @Prop()
    avatar: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    deletedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);