import { Router } from 'express';

import { AuthController } from '@/controllers';
import { CreateUserDto, LoginDto, RefreshTokenDto } from '@/dtos';
import { Routes } from '@/interfaces';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { wrapRequestHandler } from '@/utils/handles';

class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', ValidationMiddleware(CreateUserDto), wrapRequestHandler(this.auth.signUp));
    this.router.post('/login', ValidationMiddleware(LoginDto), wrapRequestHandler(this.auth.logIn));
    this.router.post('/refresh', ValidationMiddleware(RefreshTokenDto), wrapRequestHandler(this.auth.refreshToken));
  }
}

export default AuthRoute;
