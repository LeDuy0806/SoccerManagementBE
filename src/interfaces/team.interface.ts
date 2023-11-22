import { ObjectId } from 'mongodb';
import { IStatisticalTeam } from './statisticalTeam.interface';

export interface ITeam {
    _id?: ObjectId;
    name: string;
    flag: string;
    rank: string;
    coach: ObjectId;
    stadium?: ObjectId;
    players: ObjectId[];
    matches: ObjectId[];
    statisticalTeam: IStatisticalTeam;
}
