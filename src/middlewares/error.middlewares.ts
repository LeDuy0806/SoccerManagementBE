import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import { ResponseDto } from '@/dtos/http.dto';
import HTTP_STATUS from '@/constants/httpStatus';
import { CustomError } from '@/interfaces';

export const defaultErrorHandler = (err: any, req: Request, res: Response<ResponseDto>, next: NextFunction) => {
  try {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        data: omit(err, ['statusCode']),
        message: err.message,
        status: err.statusCode,
      });
    }

    const finalError: any = {};

    Object.getOwnPropertyNames(err).forEach(key => {
      if (
        !Object.getOwnPropertyDescriptor(err, key)?.configurable ||
        !Object.getOwnPropertyDescriptor(err, key)?.writable
      ) {
        return;
      }
      finalError[key] = err[key];
    });

    res.status(finalError.status).json({
      message: finalError.message,
      status: finalError.status,
      data: omit(finalError, ['stack']),
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      data: omit(error as any, ['stack']),
    });
  }
};
