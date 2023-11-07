import { Router } from 'express';

import { login, register } from '@/controllers/auth.controller';
import { wrapRequestHandler } from '@/utils/handles';

const authRouter = Router();

authRouter.post('/login', wrapRequestHandler(login));
authRouter.post('/register', wrapRequestHandler(register));

export default authRouter;
