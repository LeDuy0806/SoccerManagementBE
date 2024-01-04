import { ObjectId } from 'mongodb';

export interface IAwardTeam {
  _id?: ObjectId;
  name: ENameAwardTeam;
  team: ObjectId;
}

export enum ENameAwardTeam {
  CHAMPION = 'CHAMPION',
  FAIRPLAY = 'FAIRPLAY',
}
