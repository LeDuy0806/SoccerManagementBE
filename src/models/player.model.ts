import { IPLayer } from '@/interface/player.interface';
import { Schema, model } from 'mongoose';

const playerSchema = new Schema<IPLayer>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    position: String,
});

const Player = model<IPLayer>('Player', playerSchema);

export default Player;
