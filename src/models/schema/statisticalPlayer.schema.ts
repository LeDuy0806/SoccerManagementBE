import { IStatisticalPLayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const statisticalPlayerSchema = new Schema<IStatisticalPLayer>({
    player: { type: ObjectId, required: true },
    goals: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    assists: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    yellowCards: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    redCards: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    voteBestPlayer: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
    voteBestPosition: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
});

export const StatisticalPlayer = model<IStatisticalPLayer>(
    SCHEMA.STATISTICALPLAYER,
    statisticalPlayerSchema,
);
