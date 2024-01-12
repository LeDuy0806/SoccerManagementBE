import { IPlayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const playerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  avatar: { type: String },
  age: { type: Number },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  national: { type: String, required: true },
  number: { type: Number, required: true },
  dob: { type: Date, required: true },
  position: { type: String, required: true },
  statistical: {
    type: ObjectId,
    ref: SCHEMA.STATISTICALPLAYER,
  },
  tags: { type: String },
  captain: { type: Boolean, required: true },
});

export const Player = model<IPlayer>(SCHEMA.PLAYER, playerSchema);
