import { IStatisticalTournament } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

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
