import { Request } from 'express';
import { Iuser } from './interface/users.interface';

declare module 'express' {
    interface Request {
        user?: Iuser;
        decoded_authorization?: TokenPayload;
    }
}
