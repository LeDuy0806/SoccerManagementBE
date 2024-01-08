import { ObjectId } from 'mongodb';

export interface IMatch {
<<<<<<< HEAD
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
=======
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
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
