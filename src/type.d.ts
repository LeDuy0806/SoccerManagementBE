import 'express';
import { Iuser } from './interface';

declare module 'express' {
    interface Request {
        user?: Iuser;
        decoded_authorization?: TokenPayload;
    }
}
