import { ObjectId } from 'mongodb';

export interface IStatisticalPLayer {
    _id: ObjectId;
    player: ObjectId;
    goals: ObjectId[];
    assists: ObjectId[];
    yellowCards: ObjectId[];
    redCards: ObjectId[];
    voteBestPlayer: ObjectId[];
    voteBestPosition: ObjectId[];
}
