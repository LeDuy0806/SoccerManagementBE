import { IRound } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const roundSchema = new Schema<IRound>({
    type: { type: String, required: true },
    name: { type: String, required: true },
    matches: [{ type: ObjectId, required: true, ref: SCHEMA.MATCH }],
    leaderBoard: [{ type: ObjectId, required: true, ref: SCHEMA.TEAM }],
    numberOfTeam: { type: Number, required: true },
    tables: [{ type: ObjectId, required: true, ref: SCHEMA.TABLE }],
});

export const Round = model<IRound>(SCHEMA.ROUND, roundSchema);
