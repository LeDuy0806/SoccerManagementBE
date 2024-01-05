import { ObjectId } from 'mongodb';

export interface IReferee {
    _id?: ObjectId;
    name: string;
    avatar: string;
    age: number;
    dob: Date;
    nation: string;
    wikipedia: string;
}
