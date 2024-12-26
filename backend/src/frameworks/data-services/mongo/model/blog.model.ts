import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    image: string;

    @Prop({required: true})
    person: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    deletedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);