import { IAward } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const awardSchema = new Schema<IAward>({
    champion: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
    fairFlay: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
    best: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    goal: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    striker: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    midfielder: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    defender: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
    goalkeeper: { type: ObjectId, required: true, ref: SCHEMA.PLAYER },
});

export const Award = model<IAward>(SCHEMA.AWARD, awardSchema);
