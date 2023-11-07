import HTTP_STATUS from '@/constants/httpStatus';
import { CreateUserDto, RefreshTokenDto } from '@/dtos';
import { IUser } from '@/interfaces';
import { AuthService } from '@/services/auth.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class AuthController {
    public auth = Container.get(AuthService);

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: CreateUserDto = req.body;
            const signUpUserData: IUser = await this.auth.signup(userData);

            res.status(HTTP_STATUS.CREATED).json({
                data: signUpUserData,
                message: 'signup',
            });
        } catch (error) {
            next(error);
        }
    };

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: CreateUserDto = req.body;
            console.log(req.body);
            const { token, findUser } = await this.auth.login(userData);

            res.status(HTTP_STATUS.OK).json({
                data: findUser,
                token: token,
                message: 'login',
            });
        } catch (error) {
            next(error);
        }
    };

    public refreshToken = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const tokenData: RefreshTokenDto = req.body;
            const refreshTokenData = await this.auth.refreshToken(tokenData);
            res.status(HTTP_STATUS.OK).json({
                data: refreshTokenData,
                message: 'refresh',
            });
        } catch (error) {
            next(error);
        }
    };

    public userRoute = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            res.status(HTTP_STATUS.OK).json({
                data: req.user,
                message: 'you have accessed user route!',
            });
        } catch (error) {
            next(error);
        }
    };

    public adminRoute = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            res.status(HTTP_STATUS.OK).json({
                data: req.user,
                message: 'you have accessed admin route!',
            });
        } catch (error) {
            next(error);
        }
    };
}
