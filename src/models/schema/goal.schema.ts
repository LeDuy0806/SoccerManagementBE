import { IGoal } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const goalSchema = new Schema<IGoal>({
  player: { type: String, required: true },
  match: { type: ObjectId, required: true, ref: SCHEMA.MATCH },
  time: { type: Number, required: true },
  number: { type: Number, required: true },
});

export const Goal = model<IGoal>(SCHEMA.GOAL, goalSchema);
