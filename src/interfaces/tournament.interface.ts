import { ObjectId } from 'mongodb';

export interface ITournament {
    _id?: ObjectId;
    formula: ETypeStatusFormula;
    name: string;
    image: string;
    awardPlayers: ObjectId[];
    awardTeams: ObjectId[];
    prizes: ObjectId[];
    status: ETypeStatusTour;
    sponsor: ObjectId;
    rounds: ObjectId[];
    year: Date;
}

export enum ETypeStatusFormula {
    STAGE = 'STAGE',
    ROUND = 'ROUND',
}

export enum ETypeStatusTour {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
}
