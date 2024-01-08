import { ObjectId } from 'mongodb';
import { ITable } from './table.interface';

export interface IRound {
<<<<<<< HEAD
    _id?: ObjectId;
    name: string;
    type: string;
    numberOfTeam: number;
    tables?: ITable[];
    status: string;
    tags: string;
    matches?: ObjectId[];
    priority: number;
=======
  _id?: ObjectId;
  name: string;
  type: string;
  numberOfTeam: number;
  tables?: ITable[];
  status: string;
  tags: string;
  matches?: ObjectId[];
  priority: number;
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
