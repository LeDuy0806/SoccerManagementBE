import { ObjectId } from 'mongodb';

export interface IStatisticalTournament {
<<<<<<< HEAD
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
=======
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
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
