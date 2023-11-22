import { ObjectId } from 'mongodb';

export interface ITable {
    _id?: ObjectId;
    name: string;
    teams: ObjectId[];
    leaderBoard?: ObjectId[];
    matches: ObjectId[];
}
