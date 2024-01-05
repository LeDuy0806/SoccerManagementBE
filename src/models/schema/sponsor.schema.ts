import { ISponsor } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const sponsorSchema = new Schema<ISponsor>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    logo: { type: String, required: true },
    email: { type: String, required: true },
});

export const Sponsor = model<ISponsor>(SCHEMA.SPONSOR, sponsorSchema);
