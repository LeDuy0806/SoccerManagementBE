import { ObjectId } from 'mongodb';

export interface IStatisticalPLayer {
<<<<<<< HEAD
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
=======
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
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
