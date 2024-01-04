import { IRole, IRoleType } from '@/interfaces';
import { Schema, model } from 'mongoose';

export const roleTypeSchema = new Schema<IRoleType>({
  name: { type: String, required: true },
});

export const roleSchema = new Schema<IRole>({
  roleId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});

// 3. Create a Model.
export const RoleType = model<IRoleType>('RoleType', roleTypeSchema);
export const Role = model<IRole>('Role', roleSchema);
