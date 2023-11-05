import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';

import HTTP_STATUS from '@/constants/httpStatus';
import CustomError from '@/interface/error.interface';

export const defaultErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json(omit(err, ['statusCode']));
        }

        const finalError: any = {};

        Object.getOwnPropertyNames(err).forEach((key) => {
            if (
                !Object.getOwnPropertyDescriptor(err, key)?.configurable ||
                !Object.getOwnPropertyDescriptor(err, key)?.writable
            ) {
                return;
            }
            finalError[key] = err[key];
        });

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: finalError.message,
            errorInfo: omit(finalError, ['stack']),
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error',
            errorInfo: omit(error as any, ['stack']),
        });
    }
};
