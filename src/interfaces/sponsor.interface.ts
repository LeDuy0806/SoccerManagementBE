import { ObjectId } from 'mongodb';

export interface ISponsor {
    _id?: ObjectId;
    name: string;
    logo: string;
    email: string;
    phone: string;
}
