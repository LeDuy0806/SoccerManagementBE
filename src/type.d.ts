import 'express';
import { User } from './models/schema';

declare module 'express' {
  interface Request {
    user?: typeof User;
    decoded_authorization?: TokenPayload;
  }
}
