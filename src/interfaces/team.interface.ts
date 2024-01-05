import { ObjectId } from 'mongodb';
import { IStatisticalTeam } from './statisticalTeam.interface';

export interface ITeam {
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
}
