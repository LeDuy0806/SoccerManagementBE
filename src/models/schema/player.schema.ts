import { IPlayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePlayerDto:
 *      type: object
 *      required:
 *        - name
 *        - height
 *        - weight
 *        - national
 *        - number
 *        - dob
 *        - position
 *        - captain
 *      properties:
 *        name:
 *          type: string
 *        avatar:
 *          type: string
 *        age:
 *          type: number
 *        height:
 *          type: string
 *        weight:
 *          type: string
 *        national:
 *          type: string
 *        number:
 *          type: number
 *        dob:
 *          type: string
 *          format: date-time
 *        position:
 *          type: string
 *        captain:
 *          type: boolean
 */

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
