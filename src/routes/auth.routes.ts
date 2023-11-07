import { Router } from 'express';

import { PATHS } from '@/constants/paths';
import { AuthController } from '@/controllers';
import { CreateUserDto, LoginDto, RefreshTokenDto } from '@/dtos';
import { Routes } from '@/interfaces';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { wrapRequestHandler } from '@/utils/handles';

class AuthRoute implements Routes {
    public router = Router();
    public auth = new AuthController();
    public path = PATHS.AUTH;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/signup`,
            ValidationMiddleware(CreateUserDto),
            wrapRequestHandler(this.auth.signUp),
        );
        this.router.post(
            `${this.path}/login`,
            ValidationMiddleware(LoginDto),
            wrapRequestHandler(this.auth.logIn),
        );
        this.router.post(
            `${this.path}/refresh`,
            ValidationMiddleware(RefreshTokenDto),
            wrapRequestHandler(this.auth.refreshToken),
        );
    }
}

export default AuthRoute;
