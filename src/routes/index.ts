import { Router } from 'express';
import { PATHS } from './paths';
const route = Router();

import authRouter from './auth.routes';

route.use(PATHS.AUTH, authRouter);

export default route;
