import { ICard } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const cardSchema = new Schema<ICard>({
    player: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    victim: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    type: { type: String, required: true },
    match: { type: ObjectId, required: true, ref: SCHEMA.MATCH },
    time: { type: Date, required: true },
});

export const Card = model<ICard>(SCHEMA.CARD, cardSchema);
