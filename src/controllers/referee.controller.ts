import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { RefereeService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IReferee } from '@/interfaces';

export class RefereeController {
    public referee = Container.get(RefereeService);

    public getReferees = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const referees = await this.referee.getReferees();
            res.status(HTTP_STATUS.OK).json(referees);
        } catch (error) {
            next(error);
        }
    };

    public getReferee = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const referee = await this.referee.getReferee(id);
            res.status(HTTP_STATUS.OK).json(referee);
        } catch (error) {
            next(error);
        }
    };

    public createReferee = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const refereeData: IReferee = req.body;
        try {
            const referee = await this.referee.createReferee(refereeData);
            res.status(HTTP_STATUS.OK).json(referee);
        } catch (error) {
            next(error);
        }
    };

    public updateReferee = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const refereeData: IReferee = req.body;
        try {
            const referee = await this.referee.updateReferee(refereeData, id);
            res.status(HTTP_STATUS.OK).json(referee);
        } catch (error) {
            next(error);
        }
    };

    public deleteReferee = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.referee.deleteReferee(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
