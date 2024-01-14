import { ACCESS_TOKEN_SECRET } from '@/config';
import { IUser } from '@/interfaces';
import { User } from '@/models/schema';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, ERole, ETokenType, RequestWithUser } from '@interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

const getAuthorization = (req: any) => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id, type } = verify(Authorization, ACCESS_TOKEN_SECRET) as DataStoredInToken;
      if (type !== ETokenType.ACCESS) {
        next(new HttpException(403, 'Access permission denied'));
      }

      const findUser = await User.findById(id);
      console.log('login user', findUser);

      if (findUser.isActive == false) next(new HttpException(403, 'This account is disabled!'));

      if (findUser) {
        req.user = {
          _id: findUser._id,
          email: findUser.email,
          role: findUser.role,
        } as IUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export const AdminCheckMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { user } = req;
  if (user.role == ERole.ADMIN) {
    next();
  } else next(new HttpException(403, "Cannot access role admin's resource"));
};
