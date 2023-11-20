import { IMatch } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const matchSchema = new Schema<IMatch>({
    teamOne: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
    teamTwo: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
    pointOfTeamOne: { type: Number, required: true },
    pointOfTeamTwo: { type: Number, required: true },
    card: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    goal: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    mainReferee: { type: ObjectId, required: true, ref: SCHEMA.REFEREE },
    subReferee: [{ type: ObjectId, required: true, ref: SCHEMA.REFEREE }],
    stadium: [{ type: ObjectId, required: true, ref: SCHEMA.STADIUM }],
    round: { type: String, required: true },
    score: { type: String, required: true },
    isLive: { type: Boolean, required: true },
    time: { type: Date, required: true },
});

export const Match = model<IMatch>(SCHEMA.MATCH, matchSchema);
