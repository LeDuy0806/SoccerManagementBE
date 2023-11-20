import { IRound } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const roundSchema = new Schema<IRound>({
    type: { type: String, required: true },
    match: [{ type: ObjectId, required: true, ref: SCHEMA.MATCH }],
    numberOfTeam: { type: Number, required: true },
    status: { type: String, required: true },
});

export const Round = model<IRound>(SCHEMA.ROUND, roundSchema);
