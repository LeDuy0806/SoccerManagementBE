import { ObjectId } from 'mongodb';

export interface IPrize {
    _id?: ObjectId;
    category: string;
    status: ETypeStatusPrize;
    completion: string;
    bonus: string;
    image: string;
}

export enum ETypeStatusPrize {
    FINISH = 'FINISH',
    UNFINISH = 'UNFINISH',
}
