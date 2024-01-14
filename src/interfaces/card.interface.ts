import { ObjectId } from 'mongodb';

export interface ICard {
  _id?: ObjectId;
  type: ETypeCard;
  player: string;
  match: ObjectId;
  time: number;
  number: number;
}

export enum ETypeCard {
  YELLOW = 'YELLOW',
  RED = 'RED',
}
