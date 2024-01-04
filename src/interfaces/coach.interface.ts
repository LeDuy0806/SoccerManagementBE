import { ObjectId } from 'mongodb';

export interface ICoach {
  _id?: ObjectId;
  name: string;
  avatar: string;
  age: number;
  dob: Date;
  national: string;
}
