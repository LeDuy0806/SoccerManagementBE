import { ObjectId } from 'mongodb';
import { ITable } from './table.interface';

export interface IRound {
    _id?: ObjectId;
    name: string;
    type: ETypeRound;
    leaderBoard: ObjectId[];
    matches?: ObjectId[];
    numberOfTeam: number;
    tables?: ITable[];
}

export enum ETypeRound {
    ROUND = 'ROUND',
    STAGE = 'STAGE',
}
