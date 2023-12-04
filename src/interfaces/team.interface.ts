import { ObjectId } from 'mongodb';
import { IStatisticalTeam } from './statisticalTeam.interface';

export interface ITeam {
    _id?: ObjectId;
    name: string;
    flag: string;
    rank?: string;
    coach: ObjectId;
    players: ObjectId[];
    stadium?: ObjectId;
    matches: ObjectId[];
    statistical: IStatisticalTeam;
    tags: string[];
}
