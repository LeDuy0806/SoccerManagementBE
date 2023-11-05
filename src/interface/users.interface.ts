import { ObjectId } from 'mongodb';

export interface Iuser {
    _id?: ObjectId;
    username: string;
    email: string;
    name: string;
    password: string;
    day_of_birth: Date;
}
