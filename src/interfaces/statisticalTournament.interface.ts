import { ObjectId } from 'mongodb';

export interface IStatisticalTournament {
  _id?: ObjectId;
  totalPlayer: number;
  totalGoal: number;
  totalOwN: number;
  totalMatches: number;
  totalCard: number;
  matchMostGoal: ObjectId[];
  matchMostCard: ObjectId[];
  goalPerMatch: number;
  cardPerMatch: number;
  totalDoubleKick: number;
  totalHattrick: number;
  totalPocker: number;
  teamMostGoal: ObjectId[];
  teamMostCard: ObjectId[];
  totalYellowCard: number;
  totalRedCard: number;
  playerMostCard: ObjectId[];
}
