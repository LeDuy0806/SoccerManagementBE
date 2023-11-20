import { ObjectId } from 'mongodb';

export interface ICard {
    _id?: ObjectId;
    player: ObjectId;
    victim: ObjectId;
    type: string;
    match: ObjectId;
    time: Date;
}
