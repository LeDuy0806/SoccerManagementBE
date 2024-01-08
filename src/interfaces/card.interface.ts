import { ObjectId } from 'mongodb';

export interface ICard {
<<<<<<< HEAD
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
=======
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
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
