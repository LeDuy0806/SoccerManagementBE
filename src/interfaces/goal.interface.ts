import { ObjectId } from 'mongodb';

export interface IGoal {
  _id?: ObjectId;
  player: string;
  match: ObjectId;
  time: number;
  number: number;
}
