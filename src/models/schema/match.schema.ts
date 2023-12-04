import { IMatch } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const matchSchema = new Schema<IMatch>({
    teamOne: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
    teamTwo: { type: ObjectId, required: true, ref: SCHEMA.TEAM },
    pointOfTeamOne: { type: Number, required: true },
    pointOfTeamTwo: { type: Number, required: true },
    scoreTeamOne: { type: Number, required: true },
    scoreTeamTwo: { type: Number, required: true },
    penaltyTeamOne: { type: Number, required: true },
    penaltyTeamTwo: { type: Number, required: true },
    mainReferee: { type: ObjectId, required: true, ref: SCHEMA.REFEREE },
    subReferee: [{ type: ObjectId, required: true, ref: SCHEMA.REFEREE }],
    round: { type: String, required: true },
    time: { type: Date, required: true },
    stadium: { type: ObjectId, required: true, ref: SCHEMA.STADIUM },
    status: { type: String, required: true },
    tags: { type: String, required: true },
    cardsTeamOne: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    cardsTeamTwo: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    goalsTeamOne: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    goalsTeamTwo: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
});

export const Match = model<IMatch>(SCHEMA.MATCH, matchSchema);
