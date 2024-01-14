import { ITeam } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTeamDto:
 *      type: object
 *      required:
 *        - name
 *        - level
 *        - area
 *        - isPublic
 *      properties:
 *        name:
 *          type: string
 *        flag:
 *          type: string
 *        rank:
 *          type: string
 *        coach:
 *          type: string
 *        players:
 *          type: array
 *          items:
 *            type: string
 *        stadium:
 *          type: string
 *        matches:
 *          type: array
 *          items:
 *            type: string
 *        statistical:
 *          type: string
 *        tags:
 *          type: string
 *        representative:
 *          type: string
 *        level:
 *          type: string
 *        area:
 *          type: string
 *        isPublic:
 *          type: boolean
 *        uniform:
 *          type: array
 *          items:
 *            type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateTeamDto:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        flag:
 *          type: string
 *        rank:
 *          type: string
 *        coach:
 *          type: string
 *        players:
 *          type: array
 *          items:
 *            type: string
 *        stadium:
 *          type: string
 *        matches:
 *          type: array
 *          items:
 *            type: string
 *        statistical:
 *          type: string
 *        tags:
 *          type: string
 *        representative:
 *          type: string
 *        level:
 *          type: string
 *        area:
 *          type: string
 *        isPublic:
 *          type: boolean
 *        uniform:
 *          type: array
 *          items:
 *            type: string
 */

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
