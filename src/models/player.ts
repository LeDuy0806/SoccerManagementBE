import { Schema, model } from 'mongoose';
import { IPLayer } from '@/interface/player.interface';
import { SCHEMA } from './schema-name';

const playerSchema = new Schema<IPLayer>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    position: String,
});

const Player = model<IPLayer>(SCHEMA.PLAYER, playerSchema);

export default Player;
