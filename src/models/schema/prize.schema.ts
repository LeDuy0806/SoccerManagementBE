import { IPrize } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const prizeSchema = new Schema<IPrize>({
    category: { type: String, required: true },
    status: { type: String, required: true },
    bonus: { type: String, required: true },
    completion: { type: String, required: true },
    image: { type: String, required: true },
});

export const Prize = model<IPrize>(SCHEMA.PRIZE, prizeSchema);
