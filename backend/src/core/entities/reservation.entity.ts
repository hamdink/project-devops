import { Children, Participant } from "../dtos";

export class Reservation{
    userId: string;
    date: string;
    heure: string;
    hotel: string;
    NameOfParticipants:Participant[];
    childrens: Children[];
    activity: string[];
    nbPersonne: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;


}