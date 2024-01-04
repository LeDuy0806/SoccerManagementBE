import { ObjectId } from 'mongodb';

export interface IMatch {
  _id?: ObjectId;
  teamOne: ObjectId;
  teamTwo: ObjectId;
  pointOfTeamOne: number;
  pointOfTeamTwo: number;
  scoreTeamOne: number;
  scoreTeamTwo: number;
  penaltyTeamOne?: number;
  penaltyTeamTwo?: number;
  mainReferee: ObjectId;
  subReferee: ObjectId[];
  round: string;
  time: Date;
  stadium: ObjectId;
  status: ETypeStatusMatch;
  tags: string;
  cardsTeamOne: ObjectId[];
  cardsTeamTwo: ObjectId[];
  goalsTeamOne: ObjectId[];
  goalsTeamTwo: ObjectId[];
}

export enum ETypeStatusMatch {
  COMING = 'COMING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}
