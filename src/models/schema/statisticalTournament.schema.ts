import { IStatisticalTournament } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

export const InitStatisticalTournament = {
  totalPlayer: 0,
  totalGoal: 0,
  totalOwN: 0,
  totalMatches: 0,
  totalCard: 0,
  matchMostGoal: [],
  matchMostCard: [],
  goalPerMatch: 0,
  cardPerMatch: 0,
  totalDoubleKick: 0,
  totalHattrick: 0,
  totalPocker: 0,
  teamMostGoal: [],
  teamMostCard: [],
  totalYellowCard: 0,
  totalRedCard: 0,
  playerMostCard: [],
};

const statisticalTournamentSchema = new Schema<IStatisticalTournament>({
  totalPlayer: { type: Number, required: true },
  totalGoal: { type: Number, required: true },
  totalOwN: { type: Number, required: true },
  totalMatches: { type: Number, required: true },
  totalCard: { type: Number, required: true },
  matchMostGoal: [{ type: ObjectId, required: true, ref: SCHEMA.MATCH }],
  matchMostCard: [{ type: ObjectId, required: true, ref: SCHEMA.MATCH }],
  goalPerMatch: { type: Number, required: true },
  cardPerMatch: { type: Number, required: true },
  totalDoubleKick: { type: Number, required: true },
  totalHattrick: { type: Number, required: true },
  totalPocker: { type: Number, required: true },
  teamMostGoal: [{ type: ObjectId, required: true, ref: SCHEMA.TEAM }],
  teamMostCard: [{ type: ObjectId, required: true, ref: SCHEMA.TEAM }],
  playerMostCard: [{ type: ObjectId, required: true, ref: SCHEMA.PLAYER }],
  totalYellowCard: { type: Number, required: true },
  totalRedCard: { type: Number, required: true },
});

export const StatisticalTournament = model<IStatisticalTournament>(
  SCHEMA.STATISTICALTOURNAMENT,
  statisticalTournamentSchema,
);
