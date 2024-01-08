import { ICard } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const cardSchema = new Schema<ICard>({
  type: { type: String, required: true },
  match: { type: ObjectId, required: true, ref: SCHEMA.MATCH },
  player: { type: String, required: true },
  time: { type: Number, required: true },
  number: { type: Number, required: true },
});

export const Card = model<ICard>(SCHEMA.CARD, cardSchema);