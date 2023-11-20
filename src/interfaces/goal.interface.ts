import { ObjectId } from 'mongodb';

export interface IGoal {
    _id?: ObjectId;
    player: ObjectId;
    assist: ObjectId;
    match: ObjectId;
    time: Date;
    typeOfGoal: string;
}
