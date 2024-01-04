import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { UserService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const users = await this.user.getUsers();
      res.status(HTTP_STATUS.OK).json({
        data: users,
        status: HTTP_STATUS.OK,
        message: 'update users successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user = await this.user.getUser(id);
      res.status(HTTP_STATUS.OK).json({
        data: user,
        status: HTTP_STATUS.OK,
        message: 'get user successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const userData: IUser = req.body;
    try {
      const user = await this.user.createUser(userData);
      res.status(HTTP_STATUS.CREATED).json({
        data: user,
        status: HTTP_STATUS.CREATED,
        message: 'update user successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const userData: IUser = req.body;
    try {
      const user = await this.user.updateUser(userData, id);
      res.status(HTTP_STATUS.OK).json({
        data: user,
        status: HTTP_STATUS.OK,
        message: 'update user successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.user.deleteUser(id);
      res.status(HTTP_STATUS.OK).json({
        data: result,
        status: HTTP_STATUS.OK,
        message: 'delete user successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
