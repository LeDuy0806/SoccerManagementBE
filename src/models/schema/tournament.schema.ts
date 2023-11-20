import { ITournament } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const tournamentSchema = new Schema<ITournament>({
    name: { type: String, required: true },
    award: { type: ObjectId, required: true, ref: SCHEMA.AWARD },
    leaderBoard: { type: ObjectId, required: true, ref: SCHEMA.LEADERBOARD },
    status: { type: String, required: true },
    sponsor: { type: String, required: true },
    round: [{ type: ObjectId, required: true, ref: SCHEMA.ROUND }],
    year: { type: Date, required: true },
});

export const Tournament = model<ITournament>(
    SCHEMA.TOURNAMENT,
    tournamentSchema,
);
