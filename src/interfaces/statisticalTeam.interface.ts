import { ObjectId } from 'mongodb';

export interface IStatisticalTeam {
    _id?: ObjectId;
    team: ObjectId;
    wins: number;
    draws: number;
    losses: number;
    point: number;
    goals: ObjectId[];
    losts: ObjectId[];
    own: ObjectId[];
    yellowCards: ObjectId[];
    redCards: ObjectId[];
    rank?: number;
    voteChampion: ObjectId[];
    voteFairFlay: ObjectId[];
}
