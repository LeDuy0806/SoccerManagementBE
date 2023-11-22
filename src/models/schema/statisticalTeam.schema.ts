import { IStatisticalTeam } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const statisticalTeamSchema = new Schema<IStatisticalTeam>({
    team: { type: ObjectId, required: true },
    wins: { type: Number, required: true },
    draws: { type: Number, required: true },
    losses: { type: Number, required: true },
    point: { type: Number, required: true },
    goals: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    losts: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    own: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    yellowCards: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    redCards: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    rank: { type: Number, required: true },
    voteChampion: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
    voteFairFlay: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
});

export const StatisticalTeam = model<IStatisticalTeam>(
    SCHEMA.STATISTICALTEAM,
    statisticalTeamSchema,
);
