import { ObjectId } from 'mongodb';

export interface IStatisticalPLayer {
  _id: ObjectId;
  player: ObjectId;
  team: ObjectId;
  goals: number;
  owner: number;
  yellowCards: number;
  redCards: number;
  voteBestPlayer: number;
  voteBestPosition: number;
  tags: string;
}
