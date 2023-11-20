import { IPLayer } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const playerSchema = new Schema<IPLayer>({
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
    numberOfGoal: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    numberOfOwnGoal: [{ type: ObjectId, required: true, ref: SCHEMA.GOAL }],
    yellowCard: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    redCard: [{ type: ObjectId, required: true, ref: SCHEMA.CARD }],
    voteBestPlayer: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
    voteBestPosition: [{ type: ObjectId, required: true, ref: SCHEMA.USER }],
});

export const Player = model<IPLayer>(SCHEMA.PLAYER, playerSchema);
