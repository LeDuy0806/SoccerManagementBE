import { ObjectId } from 'mongodb';

export interface IAwardTeam {
    _id?: ObjectId;
    name: ENameAwardTeam;
    object: ObjectId;
}

export enum ENameAwardTeam {
    CHAMPION = 'CHAMPION',
    COLLECTIVE = 'COLLECTIVE',
}
