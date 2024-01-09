import 'express';
import { User } from './models/schema';
import { TokenPayload } from './interfaces';

declare module 'express' {
  interface Request {
    user?: typeof User;
    decoded_authorization?: TokenPayload;
  }
}
