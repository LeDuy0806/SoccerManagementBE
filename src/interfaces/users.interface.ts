import { ObjectId } from 'mongodb';
import { ERole } from './auth.interface';

export interface IUser {
  _id?: ObjectId;
  username: string;
  phone: string;
  avatar: string;
  email: string;
  password: string;
  dob: Date;
  isActive: boolean;
  refreshToken?: string;
  role: ERole;
}

export interface IRoleType {
  _id?: ObjectId;
  name: string;
}

export interface IRole {
  roleId: ObjectId;
  userId: ObjectId;
}
