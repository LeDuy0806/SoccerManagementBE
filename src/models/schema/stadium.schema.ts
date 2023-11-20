import { IStadium } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const stadiumSchema = new Schema<IStadium>({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: String, required: true },
    coordinate: { type: String, required: true },
});

export const Stadium = model<IStadium>(SCHEMA.STADIUM, stadiumSchema);
