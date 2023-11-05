import { ObjectId } from 'mongodb';

export interface IPLayer {
    _id?: ObjectId;
    name: string;
    age: number;
    position: string;
}
