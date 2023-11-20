import { IPrize } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const prizeSchema = new Schema<IPrize>({
    category: { type: String, required: true },
    status: { type: Boolean, required: true },
    bonus: { type: String, required: true },
    completion: { type: String, required: true },
});

export const PRIZE = model<IPrize>(SCHEMA.PRIZE, prizeSchema);
