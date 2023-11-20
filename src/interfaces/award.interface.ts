import { ObjectId } from 'mongodb';

export interface IAward {
    _id?: ObjectId;
    champion: ObjectId;
    fairFlay: ObjectId;
    best: ObjectId;
    goal: ObjectId;
    striker: ObjectId;
    midfielder: ObjectId;
    defender: ObjectId;
    goalkeeper: ObjectId;
}
