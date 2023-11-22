import { ITournament } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const tournamentSchema = new Schema<ITournament>({
    formula: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    awardPlayers: [{ type: ObjectId, required: true, ref: SCHEMA.AWARDPLAYER }],
    awardTeams: [{ type: ObjectId, required: true, ref: SCHEMA.AWARDTEAM }],
    prizes: [{ type: ObjectId, required: true }],
    status: { type: String, required: true },
    sponsor: { type: String, required: true },
    rounds: [{ type: ObjectId, required: true, ref: SCHEMA.ROUND }],
    year: { type: Date, required: true },
});

export const Tournament = model<ITournament>(
    SCHEMA.TOURNAMENT,
    tournamentSchema,
);
