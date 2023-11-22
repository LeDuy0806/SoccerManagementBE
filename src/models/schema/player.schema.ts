import { IPlayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const playerSchema = new Schema<IPlayer>({
    name: { type: String, required: true },
    avatar: { type: String },
    age: { type: Number, required: true },
    height: { type: String, required: true },
    national: { type: String, required: true },
    number: { type: Number, required: true },
    dob: { type: Date, required: true },
    dateStart: { type: Date, required: true },
    position: { type: String, required: true },
    goals: { type: Number, required: true },
    ownerClub: { type: String, required: true },
    statisticalPlayer: {
        type: ObjectId,
        required: true,
        ref: SCHEMA.STATISTICALPLAYER,
    },
});

export const Player = model<IPlayer>(SCHEMA.PLAYER, playerSchema);
