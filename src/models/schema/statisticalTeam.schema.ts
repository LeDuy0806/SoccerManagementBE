import { IStatisticalTeam } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const statisticalTeamSchema = new Schema<IStatisticalTeam>({
    team: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
    wins: { type: Number, required: true },
    draws: { type: Number, required: true },
    losses: { type: Number, required: true },
    point: { type: Number, required: true },
    numberOfGoal: { type: Number, required: true },
    numberOfLost: { type: Number, required: true },
    numberOfOwnGoal: { type: Number, required: true },
    yellowCard: { type: Number, required: true },
    yellowRed: { type: Number, required: true },
    tournament: { type: Number, required: true, ref: SCHEMA.TOURNAMENT },
});

export const statisticalTeam = model<IStatisticalTeam>(
    SCHEMA.STATISTICALTEAM,
    statisticalTeamSchema,
);
