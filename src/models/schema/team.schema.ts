import { ITeam } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  flag: { type: String },
  rank: { type: String },
  coach: { type: ObjectId, ref: SCHEMA.COACH },
  players: [
    {
      type: ObjectId,
      ref: SCHEMA.PLAYER,
    },
  ],
  stadium: { type: ObjectId, ref: SCHEMA.STADIUM },
  matches: [
    {
      type: ObjectId,
      ref: SCHEMA.MATCH,
    },
  ],
  statistical: {
    type: ObjectId,
    ref: SCHEMA.STATISTICALTEAM,
  },
  tags: { type: String },
  representative: {
    type: ObjectId,
    ref: SCHEMA.USER,
  },
  level: { type: String, required: true },
  area: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  uniform: [{ type: String }],
});

export const Team = model<ITeam>(SCHEMA.TEAM, teamSchema);
