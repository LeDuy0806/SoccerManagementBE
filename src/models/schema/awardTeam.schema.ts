import { IAwardTeam } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const awardTeamSchema = new Schema<IAwardTeam>({
  name: { type: String, required: true },
  team: { type: ObjectId, ref: SCHEMA.TEAM },
});

export const AwardTeam = model<IAwardTeam>(SCHEMA.AWARDTEAM, awardTeamSchema);
