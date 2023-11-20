import { ObjectId } from 'mongodb';

export interface ITournament {
    _id?: ObjectId;
    name: string;
    award: ObjectId;
    prize: ObjectId;
    leaderBoard: ObjectId;
    status: string;
    sponsor: string;
    round: ObjectId[];
    year: Date;
}
