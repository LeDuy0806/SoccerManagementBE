import { ObjectId } from 'mongodb';
import { IStatisticalPLayer } from './statisticalPlayer.interface';

export interface IPlayer {
<<<<<<< HEAD
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
    statistical: IStatisticalPLayer;
    tags: string;
    captain?: boolean;
=======
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
  statistical: IStatisticalPLayer;
  tags: string;
  captain?: boolean;
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
