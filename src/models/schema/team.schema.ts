import { ITeam } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const teamSchema = new Schema<ITeam>({
    name: { type: String, required: true },
    flag: { type: String, required: true },
    coach: { type: ObjectId, ref: SCHEMA.COACH },
    players: [
        {
            type: ObjectId,
            ref: SCHEMA.PLAYER,
        },
    ],
    matches: [
        {
            type: ObjectId,
            ref: SCHEMA.MATCH,
        },
    ],
    voteChampion: [
        {
            type: ObjectId,
            ref: SCHEMA.USER,
        },
    ],
    voteFairPlay: [
        {
            type: ObjectId,
            ref: SCHEMA.USER,
        },
    ],
});

export const Team = model<ITeam>(SCHEMA.TEAM, teamSchema);
