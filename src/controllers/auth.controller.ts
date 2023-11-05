import HTTP_STATUS from '@/constants/httpStatus';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({ message: 'login' });
};

export const register = async (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({ message: 'register' });
};
