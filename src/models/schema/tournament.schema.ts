import { ITournament } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const tournamentSchema = new Schema<ITournament>({
  formula: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  logo: { type: String, required: true },
  prizes: [{ type: ObjectId, required: true, ref: SCHEMA.PRIZE }],
  awardTeams: [{ type: ObjectId, required: true, ref: SCHEMA.AWARDTEAM }],
  awardPlayers: [{ type: ObjectId, required: true, ref: SCHEMA.AWARDPLAYER }],
  vision: { type: String, required: true },
  teams: [{ type: ObjectId, required: true, ref: SCHEMA.TEAM }],
  rounds: [{ type: ObjectId, required: true, ref: SCHEMA.ROUND }],
  stadiums: [{ type: ObjectId, required: true, ref: SCHEMA.STADIUM }],
  referees: [{ type: ObjectId, required: true, ref: SCHEMA.REFEREE }],
  sponsor: { type: ObjectId, required: true, ref: SCHEMA.SPONSOR },
  season: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  statistical: {
    type: ObjectId,
    required: true,
    ref: SCHEMA.STATISTICALTOURNAMENT,
  },
  tags: { type: String, required: true },
  maxTeam: { type: Number, required: true },
});

export const Tournament = model<ITournament>(SCHEMA.TOURNAMENT, tournamentSchema);