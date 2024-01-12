import { IStatisticalPLayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const statisticalPlayerSchema = new Schema<IStatisticalPLayer>({
  player: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
  team: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
  goals: { type: Number, required: true },
  owner: { type: Number, required: true },
  yellowCards: { type: Number, required: true },
  redCards: { type: Number, required: true },
  voteBestPlayer: { type: Number, required: true },
  voteBestPosition: { type: Number, required: true },
  tags: { type: String },
});

export const StatisticalPlayer = model<IStatisticalPLayer>(SCHEMA.STATISTICALPLAYER, statisticalPlayerSchema);
