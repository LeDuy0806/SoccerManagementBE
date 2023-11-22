import { IGoal } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const goalSchema = new Schema<IGoal>({
    player: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    assist: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    time: { type: Date, required: true },
    match: { type: ObjectId, required: true, ref: SCHEMA.MATCH },
    type: { type: String, required: true },
});

export const Goal = model<IGoal>(SCHEMA.GOAL, goalSchema);
