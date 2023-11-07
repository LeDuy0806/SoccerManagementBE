import { User } from '@/models/schema';
import { Request } from 'express';

export enum ERole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    DELIVERER = 'DELIVERER',
}

export enum ETokenType {
    REFRESH = 'REFRESH',
    ACCESS = 'ACCESS',
}

export interface DataStoredInToken {
    id: string;
    role: ERole;
    type: ETokenType;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface TokenPayload {
    accessToken: string;
    refreshToken: string;
}

export interface RequestWithUser extends Request {
    user: typeof User;
}
