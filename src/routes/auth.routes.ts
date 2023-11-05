import { Router } from 'express';

import { wrapRequestHandler } from '@/utils/handles';
import { login, register } from '@/controllers/auth.controller';

const authRouter = Router();

authRouter.post('/login', wrapRequestHandler(login));
authRouter.post('/register', wrapRequestHandler(register));

export default authRouter;
