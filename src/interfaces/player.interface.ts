import { ObjectId } from 'mongodb';

export interface IPlayer {
  _id?: ObjectId;
  name: string;
  avatar: string;
  age: number;
  height: string;
  weight: string;
  national: string;
  number: number;
  dob: Date;
  position: string;
  statistical: ObjectId;
  tags: string;
  captain?: string | boolean;
}
