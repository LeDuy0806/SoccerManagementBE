import { ICoach } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const coachSchema = new Schema<ICoach>({
  name: { type: String, required: true },
  avatar: { type: String },
  age: { type: Number },
  dob: { type: Date },
  national: { type: String },
});

export const Coach = model<ICoach>(SCHEMA.COACH, coachSchema);
