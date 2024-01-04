import { ObjectId } from 'mongodb';

export interface ITournament {
  _id?: ObjectId;
  formula: ETypeFormulaTour;
  name: string;
  image: string;
  logo: string;
  prizes: ObjectId[];
  awardTeams: ObjectId[];
  awardPlayers: ObjectId[];
  vision: ETypeVisionTour;
  teams: ObjectId[];
  rounds: ObjectId[];
  stadiums: ObjectId[];
  referees: ObjectId[];
  sponsor: ObjectId;
  season: string;
  status: ETypeStatusTour;
  description: string;
  statistical: ObjectId;
  tags: string;
  maxTeam: number;
}

export enum ETypeFormulaTour {
  STAGE = 'KNOCKOUT',
  ROUND_FIGHT = 'ROUND FIGHT',
  TABLE = 'GROUP STAGE',
}

export enum ETypeVisionTour {
  DOMESTIC = 'DOMESTIC',
  INTERNATIONAL = 'INTERNATIONAL',
}

export enum ETypeStatusTour {
  REGISTERING = 'REGISTERING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}
