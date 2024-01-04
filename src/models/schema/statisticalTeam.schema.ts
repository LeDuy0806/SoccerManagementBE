import { IStatisticalTeam } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const statisticalTeamSchema = new Schema<IStatisticalTeam>({
  team: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
  wins: { type: Number, required: true },
  draws: { type: Number, required: true },
  losses: { type: Number, required: true },
  point: { type: Number, required: true },
  goals: { type: Number, required: true },
  losts: { type: Number, required: true },
  owns: { type: Number, required: true },
  yellowCards: { type: Number, required: true },
  redCards: { type: Number, required: true },
  rank: { type: Number, required: true },
  voteChampions: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
  voteFairPlays: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
  tags: { type: String, required: true },
  history: [{ type: String, required: true }],
});

export const StatisticalTeam = model<IStatisticalTeam>(SCHEMA.STATISTICALTEAM, statisticalTeamSchema);
