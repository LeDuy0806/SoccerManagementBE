import { IReferee } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const refereeSchema = new Schema<IReferee>({
    name: { type: String, required: true },
    avatar: { type: String },
    age: { type: Number },
    dob: { type: Date },
    nation: { type: String, required: true },
    wikipedia: { type: String },
});

export const Referee = model<IReferee>(SCHEMA.REFEREE, refereeSchema);
