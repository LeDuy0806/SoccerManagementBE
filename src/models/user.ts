import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { Iuser } from '@/interface/users.interface';

const userSchema = new Schema<Iuser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    day_of_birth: { type: Date },
});

const Player = model<Iuser>(SCHEMA.PLAYER, userSchema);

export default Player;
