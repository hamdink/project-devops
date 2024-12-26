import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Children, Participant } from "src/core";

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    date: Date;

    @Prop({required: true})
    heure: string;

    @Prop({required: true})
    hotel: string;

    @Prop({required: true})
    NameOfParticipants: Participant[];

    @Prop({ required: true })
    childrens:Children[];

    @Prop({required: true})
    activity: string[];

    @Prop({required: true})
    nbPersonne: number;

    @Prop()
    status: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop()
    deletedAt: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);