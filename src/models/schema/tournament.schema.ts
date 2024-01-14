import { ITournament } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTournamentDto:
 *      type: object
 *      required:
 *        - name
 *        - formula
 *        - vision
 *        - prizes
 *        - stadiums
 *        - referees
 *        - maxTeam
 *      properties:
 *        formula:
 *          type: string
 *          enum:
 *            - KNOCKOUT
 *            - ROUND FIGHT
 *            - GROUP STAGE
 *        name:
 *          type: string
 *        image:
 *          type: string
 *        logo:
 *          type: string
 *        prizes:
 *          type: array
 *          items:
 *            type: string
 *        vision:
 *          type: string
 *          enum:
 *            - DOMESTIC
 *            - INTERNATIONAL
 *        teams:
 *          type: array
 *          items:
 *            type: string
 *        stadiums:
 *          type: array
 *          items:
 *            type: string
 *        referees:
 *          type: array
 *          items:
 *            type: string
 *        sponsor:
 *          type: string
 *        maxTeam:
 *          type: number
 */

const tournamentSchema = new Schema<ITournament>({
  formula: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  logo: { type: String },
  prizes: [{ type: ObjectId, required: true, ref: SCHEMA.PRIZE }],
  awardTeams: [{ type: ObjectId, ref: SCHEMA.AWARDTEAM }],
  awardPlayers: [{ type: ObjectId, ref: SCHEMA.AWARDPLAYER }],
  vision: { type: String, required: true },
  teams: [{ type: ObjectId, required: true, ref: SCHEMA.TEAM }],
  rounds: [{ type: ObjectId, required: true, ref: SCHEMA.ROUND }],
  stadiums: [{ type: ObjectId, required: true, ref: SCHEMA.STADIUM }],
  referees: [{ type: ObjectId, required: true, ref: SCHEMA.REFEREE }],
  sponsor: { type: ObjectId, ref: SCHEMA.SPONSOR },
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
