import HTTP_STATUS from '@/constants/httpStatus';
import { CreateUserDto, RefreshTokenDto } from '@/dtos';
import { ResponseDto } from '@/dtos/http.dto';
import { AuthRepository } from '@/repositories/auth.repository';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class AuthController {
  public auth = Container.get(AuthRepository);

  public signUp = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { token, signUpUserData } = await this.auth.signup(userData);

      res.status(HTTP_STATUS.CREATED).json({
        data: {
          user: signUpUserData,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
        status: HTTP_STATUS.CREATED,
        message: 'signup successfully!',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { token, findUser } = await this.auth.login(userData);

      res.status(HTTP_STATUS.OK).json({
        data: {
          user: findUser,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
        status: HTTP_STATUS.OK,
        message: 'login successfully!',
      });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const tokenData: RefreshTokenDto = req.body;
      const refreshTokenData = await this.auth.refreshToken(tokenData);
      res.status(HTTP_STATUS.OK).json({
        data: refreshTokenData,
        status: HTTP_STATUS.OK,
        message: 'refresh successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public userRoute = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      res.status(HTTP_STATUS.OK).json({
        data: req.user,
        status: HTTP_STATUS.OK,
        message: 'you have accessed user route!',
      });
    } catch (error) {
      next(error);
    }
  };

  public adminRoute = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      res.status(HTTP_STATUS.OK).json({
        data: req.user,
        status: HTTP_STATUS.OK,
        message: 'you have accessed admin route!',
      });
    } catch (error) {
      next(error);
    }
  };
}
