import { IAwardPlayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const awardPlayerSchema = new Schema<IAwardPlayer>({
    name: { type: String, required: true },
    player: { type: ObjectId, ref: SCHEMA.PLAYER },
});

export const AwardPlayer = model<IAwardPlayer>(
    SCHEMA.AWARDPLAYER,
    awardPlayerSchema,
);
