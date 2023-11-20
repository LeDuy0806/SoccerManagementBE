export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    dob: Date;
    isActive: boolean;
    refreshToken?: string;
    role: ERole;
}

export enum ERole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    DELIVERER = 'DELIVERER',
}

export interface IRoleType {
    _id?: string;
    name: string;
}

export interface IRole {
    roleId: String;
    userId: string;
}