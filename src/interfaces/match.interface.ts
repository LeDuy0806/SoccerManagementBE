import { ObjectId } from 'mongodb';

export interface IMatch {
    _id?: ObjectId;
    teamOne: ObjectId;
    teamTwo: ObjectId;
    pointOfTeamOne: number;
    pointOfTeamTwo: number;
    card: ObjectId[];
    goal: ObjectId[];
    mainReferee: ObjectId;
    subReferee: ObjectId[];
    stadium: ObjectId;
    round: string;
    score: string;
    isLive: boolean;
    time: Date;
}
