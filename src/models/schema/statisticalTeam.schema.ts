import { IStatisticalTeam } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateStatisticalTeamDto:
 *      type: object
 *      required:
 *        - team
 *        - wins
 *        - draws
 *        - losses
 *        - point
 *        - goals
 *        - matches
 *        - losts
 *        - owns
 *        - yellowCards
 *        - redCards
 *        - voteChampions
 *        - voteFairPlays
 *        - history
 *      properties:
 *        team:
 *          type: string
 *        wins:
 *          type: number
 *        draws:
 *          type: number
 *        losses:
 *          type: number
 *        point:
 *          type: number
 *        goals:
 *          type: number
 *        matches:
 *          type: number
 *        losts:
 *          type: number
 *        owns:
 *          type: number
 *        yellowCards:
 *          type: number
 *        redCards:
 *          type: number
 *        rank:
 *          type: number
 *        voteChampions:
 *          type: array
 *          items:
 *            type: string
 *        voteFairPlays:
 *          type: array
 *          items:
 *            type: string
 *        tags:
 *          type: string
 *        history:
 *          type: array
 *          items:
 *            type: string
 */

const statisticalTeamSchema = new Schema<IStatisticalTeam>({
  team: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
  wins: { type: Number, required: true },
  draws: { type: Number, required: true },
  losses: { type: Number, required: true },
  point: { type: Number, required: true },
  goals: { type: Number, required: true },
  matches: { type: Number, required: true },
  losts: { type: Number, required: true },
  owns: { type: Number, required: true },
  yellowCards: { type: Number, required: true },
  redCards: { type: Number, required: true },
  rank: { type: Number },
  voteChampions: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
  voteFairPlays: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
  tags: { type: String },
  history: [{ type: String, required: true }],
});

export const StatisticalTeam = model<IStatisticalTeam>(SCHEMA.STATISTICALTEAM, statisticalTeamSchema);
