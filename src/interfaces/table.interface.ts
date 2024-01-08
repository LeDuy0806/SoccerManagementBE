import { ObjectId } from 'mongodb';

export interface ITable {
<<<<<<< HEAD
    _id?: ObjectId;
    name: string;
    teams: ObjectId[];
    leaderBoard?: ObjectId[];
    matches: ObjectId[];
    tags: string;
=======
  _id?: ObjectId;
  name: string;
  teams: ObjectId[];
  leaderBoard?: ObjectId[];
  matches: ObjectId[];
  tags: string;
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
