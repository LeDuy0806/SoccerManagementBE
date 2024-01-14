import { ERole, IUser } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    dob: { type: Date },
    role: { type: String, enum: ERole, default: ERole.VIEWER },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>(SCHEMA.USER, userSchema);
