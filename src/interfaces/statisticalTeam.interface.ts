import { ObjectId } from 'mongodb';

export interface IStatisticalTeam {
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
}
