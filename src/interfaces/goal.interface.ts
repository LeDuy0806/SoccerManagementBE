import { ObjectId } from 'mongodb';

export interface IGoal {
    _id?: ObjectId;
    type: ETypeGoal;
    player: ObjectId;
    assist: ObjectId;
    match: ObjectId;
    time: Date;
}

export enum ETypeGoal {
    FOOT = 'FOOT',
    HEAD = 'HEAD',
}
