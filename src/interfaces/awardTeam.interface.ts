import { ObjectId } from 'mongodb';

export interface IAwardTeam {
<<<<<<< HEAD
    _id?: ObjectId;
    name: ENameAwardTeam;
    team: ObjectId;
}

export enum ENameAwardTeam {
    CHAMPION = 'CHAMPION',
    FAIRPLAY = 'FAIRPLAY',
=======
  _id?: ObjectId;
  name: ENameAwardTeam;
  team: ObjectId;
}

export enum ENameAwardTeam {
  CHAMPION = 'CHAMPION',
  FAIRPLAY = 'FAIRPLAY',
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
