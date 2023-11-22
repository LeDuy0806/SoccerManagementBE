import { ObjectId } from 'mongodb';

export interface IMatch {
    _id?: ObjectId;
    teamOne: ObjectId;
    teamTwo: ObjectId;
    pointOfTeamOne: number;
    pointOfTeamTwo: number;
    cards: ObjectId[];
    goals: ObjectId[];
    mainReferee: ObjectId;
    subReferee: ObjectId[];
    score: string;
    stadium: ObjectId;
    round: string;
    status: ETypeStatusMatch;
    time: Date;
}

export enum ETypeStatusMatch {
    UNSTARTED = 'NOT STARTED',
    HAPPING = 'HAPPING',
    END = 'END',
}
