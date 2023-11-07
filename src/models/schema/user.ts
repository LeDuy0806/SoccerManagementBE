import { Iuser } from '@/interface/users.interface';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const userSchema = new Schema<Iuser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    day_of_birth: { type: Date },
});

export const Player = model<Iuser>(SCHEMA.PLAYER, userSchema);
