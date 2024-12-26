import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
 

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;
    
    
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    phone: string;

    @Prop({required: true})
    objet: string;

    @Prop({required: true})
    message: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    deletedAt: Date;
}
export const ContactSchema = SchemaFactory.createForClass(Contact);