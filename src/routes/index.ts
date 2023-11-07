import { Router } from 'express';
import { PATHS } from '../constants/paths';
const route = Router();

import AuthRoute from './auth.routes';

route.use(PATHS.AUTH, new AuthRoute().router);

export default route;
