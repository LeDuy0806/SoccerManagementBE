import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { UserService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '@/interfaces';

export class UserController {
    public user = Container.get(UserService);

    public getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const users = await this.user.getUsers();
            res.status(HTTP_STATUS.OK).json(users);
        } catch (error) {
            next(error);
        }
    };

    public getUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const user = await this.user.getUser(id);
            res.status(HTTP_STATUS.OK).json(user);
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const userData: IUser = req.body;
        try {
            const user = await this.user.createUser(userData);
            res.status(HTTP_STATUS.OK).json(user);
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const userData: IUser = req.body;
        try {
            const user = await this.user.updateUser(userData, id);
            res.status(HTTP_STATUS.OK).json(user);
        } catch (error) {
            next(error);
        }
    };

    public deleteUpdate = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.user.deleteUser(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
