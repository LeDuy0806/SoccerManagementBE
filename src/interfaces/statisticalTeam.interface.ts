import { ObjectId } from 'mongodb';

export interface IStatisticalTeam {
    _id?: ObjectId;
    team: ObjectId;
    wins: number;
    draws: number;
    losses: number;
    point: number;
    numberOfGoal: number;
    numberOfLost: number;
    numberOfOwnGoal: number;
    yellowCard: number;
    yellowRed: number;
    rank: number;
    tournament: ObjectId;
}
