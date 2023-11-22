import { ObjectId } from 'mongodb';

export interface ICard {
    _id?: ObjectId;
    type: ETypeCard;
    player: ObjectId;
    victim: ObjectId;
    match: ObjectId;
    time: Date;
}

export enum ETypeCard {
    YELLOW = 'YELLOW',
    RED = 'RED',
}
