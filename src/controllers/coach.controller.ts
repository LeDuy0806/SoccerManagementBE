import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { CoachService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { ICoach } from '@/interfaces';

export class CoachController {
    public coach = Container.get(CoachService);

    public getCoaches = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const coaches = await this.coach.getCoaches();
            res.status(HTTP_STATUS.OK).json(coaches);
        } catch (error) {
            next(error);
        }
    };

    public getCoach = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const coach = await this.coach.getCoach(id);
            res.status(HTTP_STATUS.OK).json(coach);
        } catch (error) {
            next(error);
        }
    };

    public createCoach = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const CoachData: ICoach = req.body;
        try {
            const coach = await this.coach.createCoach(CoachData);
            res.status(HTTP_STATUS.OK).json(coach);
        } catch (error) {
            next(error);
        }
    };

    public updateCoach = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const CoachData: ICoach = req.body;
        try {
            const coach = await this.coach.updateCoach(CoachData, id);
            res.status(HTTP_STATUS.OK).json(coach);
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
            const result = await this.coach.deleteCoach(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
