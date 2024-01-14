import { IStatisticalPLayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateStatisticalPLayerDto:
 *      type: object
 *      required:
 *        - player
 *        - team
 *        - goals
 *        - owner
 *        - yellowCards
 *        - redCards
 *        - voteBestPlayer
 *        - voteBestPosition
 *      properties:
 *        player:
 *          type: string
 *        team:
 *          type: string
 *        goals:
 *          type: number
 *        owner:
 *          type: number
 *        yellowCards:
 *          type: number
 *        redCards:
 *          type: number
 *        voteBestPlayer:
 *          type: number
 *        voteBestPosition:
 *          type: number
 *        tags:
 *          type: string
 */

const statisticalPlayerSchema = new Schema<IStatisticalPLayer>({
  player: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
  team: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
  goals: { type: Number, required: true },
  owner: { type: Number, required: true },
  yellowCards: { type: Number, required: true },
  redCards: { type: Number, required: true },
  voteBestPlayer: { type: Number, required: true },
  voteBestPosition: { type: Number, required: true },
  tags: { type: String },
});

export const StatisticalPlayer = model<IStatisticalPLayer>(SCHEMA.STATISTICALPLAYER, statisticalPlayerSchema);
