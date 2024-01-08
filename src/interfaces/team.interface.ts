import { ObjectId } from 'mongodb';
import { IStatisticalTeam } from './statisticalTeam.interface';

export interface ITeam {
<<<<<<< HEAD
    _id?: ObjectId;
    name: string;
    flag: string;
    representative: ObjectId;
    level: ETypeLevel;
    area: string;
    isPublic: ETypeStatus;
    uniform: string[];
    rank?: string;
    coach: ObjectId;
    players: ObjectId[];
    stadium?: ObjectId;
    matches: ObjectId[];
    statistical: IStatisticalTeam;
    tags: string;
}

export enum ETypeStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export enum ETypeLevel {
    PROFESSIONAL = 'PROFESSIONAL',
    SEMIPROFESSIONAL = 'SEMIPROFESSIONAL',
    FUN = 'FUN',
=======
  _id?: ObjectId;
  name: string;
  flag: string;
  rank?: string;
  coach: ObjectId;
  players: ObjectId[];
  stadium?: ObjectId;
  matches: ObjectId[];
  statistical: IStatisticalTeam;
  tags: string[];
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
