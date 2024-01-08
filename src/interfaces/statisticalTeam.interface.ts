import { ObjectId } from 'mongodb';

export interface IStatisticalTeam {
<<<<<<< HEAD
    _id?: ObjectId;
    team: ObjectId;
    wins: number;
    draws: number;
    losses: number;
    point: number;
    goals: number;
    losts: number;
    owns: number;
    yellowCards: number;
    redCards: number;
    rank?: number;
    voteChampions: ObjectId[];
    voteFairPlays: ObjectId[];
    history?: ETypeHistory[];
    tags: string;
}

export enum ETypeHistory {
    WIN = 'WIN',
    DRAW = 'DRAW',
    LOSSES = 'LOSSES',
=======
  _id?: ObjectId;
  team: ObjectId;
  wins: number;
  draws: number;
  losses: number;
  point: number;
  goals: number;
  losts: number;
  owns: number;
  yellowCards: number;
  redCards: number;
  rank?: number;
  voteChampions: ObjectId[];
  voteFairPlays: ObjectId[];
  history?: ETypeHistory[];
  tags: string;
}

export enum ETypeHistory {
  WIN = 'WIN',
  DRAW = 'DRAW',
  LOSSES = 'LOSSES',
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
