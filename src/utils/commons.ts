import { Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { capitalize } from 'lodash';
import { verifyToken } from './jwt';

import HTTP_STATUS from '@/constants/httpStatus';
import { USERS_MESSAGES } from '@/constants/messages';
import CustomError from '@/interfaces/error.interface';

export const verifyAccessToken = async (
    access_token: string,
    req?: Request,
) => {
    if (!access_token) {
        throw new CustomError(
            HTTP_STATUS.UNAUTHORIZED,
            USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
        );
    }
    try {
        const decoded_authorization = await verifyToken({
            token: access_token,
            secretOrPublicKey: process.env.ACCESS_TOKEN_SECRET as string,
        });
        if (req) {
            (req as Request).decoded_authorization = decoded_authorization;
            return true;
        }
        return decoded_authorization;
    } catch (error) {
        throw new CustomError(
            HTTP_STATUS.UNAUTHORIZED,
            capitalize((error as JsonWebTokenError).message),
        );
    }
};
