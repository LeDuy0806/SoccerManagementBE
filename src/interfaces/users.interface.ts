import { ObjectId } from 'mongodb';
import { ERole } from './auth.interface';

export interface IUser {
<<<<<<< HEAD
    _id?: ObjectId;
    username: string;
    avatar: string;
    email: string;
    password: string;
    dob: Date;
    isActive: boolean;
    refreshToken?: string;
    role: ERole;
=======
  _id?: ObjectId;
  username: string;
  avatar: string;
  email: string;
  password: string;
  dob: Date;
  isActive: boolean;
  refreshToken?: string;
  role: ERole;
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}

export interface IRoleType {
  _id?: ObjectId;
  name: string;
}

export interface IRole {
  roleId: ObjectId;
  userId: ObjectId;
}
