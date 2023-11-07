import { IPLayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const playerSchema = new Schema<IPLayer>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    position: String,
});

export const Player = model<IPLayer>(SCHEMA.PLAYER, playerSchema);
