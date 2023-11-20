import { ILeaderBoard } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const leaderBoardSchema = new Schema<ILeaderBoard>({
    leaderBoard: [
        { type: ObjectId, required: true, ref: SCHEMA.STATISTICALTEAM },
    ],
    statisticTeam: [
        { type: String, required: true, ref: SCHEMA.STATISTICALTEAM },
    ],
});

export const LeaderBoard = model<ILeaderBoard>(
    SCHEMA.LEADERBOARD,
    leaderBoardSchema,
);
