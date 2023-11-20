import { ObjectId } from 'mongodb';

export interface IPrize {
    _id?: ObjectId;
    category: string;
    status: boolean;
    bonus: string;
    completion: string;
}
