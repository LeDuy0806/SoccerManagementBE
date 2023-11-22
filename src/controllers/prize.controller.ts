import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { PrizeService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IPrize } from '@/interfaces';

export class PrizeController {
    public prize = Container.get(PrizeService);

    public getPrizes = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const prizes = await this.prize.getPrizes();
            res.status(HTTP_STATUS.OK).json(prizes);
        } catch (error) {
            next(error);
        }
    };

    public getPrize = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const prize = await this.prize.getPrize(id);
            res.status(HTTP_STATUS.OK).json(prize);
        } catch (error) {
            next(error);
        }
    };

    public createPrize = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const PrizeData: IPrize = req.body;
        try {
            const prize = await this.prize.createPrize(PrizeData);
            res.status(HTTP_STATUS.OK).json(prize);
        } catch (error) {
            next(error);
        }
    };

    public updatePrize = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const PrizeData: IPrize = req.body;
        try {
            const Prize = await this.prize.updatePrize(PrizeData, id);
            res.status(HTTP_STATUS.OK).json(Prize);
        } catch (error) {
            next(error);
        }
    };

    public deletePrize = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.prize.deletePrize(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
