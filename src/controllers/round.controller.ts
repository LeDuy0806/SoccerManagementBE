import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { RoundService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IRound } from '@/interfaces';

export class RoundController {
    public round = Container.get(RoundService);

    public getRoundStage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const roundStage = await this.round.getRoundStage();
            res.status(HTTP_STATUS.OK).json(roundStage);
        } catch (error) {
            next(error);
        }
    };

    public getRound = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const round = await this.round.getRound(id);
            res.status(HTTP_STATUS.OK).json(round);
        } catch (error) {
            next(error);
        }
    };

    public createRound = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const roundData: IRound = req.body;
        try {
            const round = await this.round.createRound(roundData);
            res.status(HTTP_STATUS.OK).json(round);
        } catch (error) {
            next(error);
        }
    };

    public updateRound = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const roundData: IRound = req.body;
        try {
            const Round = await this.round.updateRound(roundData, id);
            res.status(HTTP_STATUS.OK).json(Round);
        } catch (error) {
            next(error);
        }
    };

    public deleteRound = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.round.deleteRound(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
