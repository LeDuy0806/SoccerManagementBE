import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { StadiumService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IStadium } from '@/interfaces';

export class StadiumController {
    public stadium = Container.get(StadiumService);

    public getStadiums = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const stadiums = await this.stadium.getStadiums();
            res.status(HTTP_STATUS.OK).json(stadiums);
        } catch (error) {
            next(error);
        }
    };

    public getStadium = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const stadium = await this.stadium.getStadium(id);
            res.status(HTTP_STATUS.OK).json(stadium);
        } catch (error) {
            next(error);
        }
    };

    public createStadium = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const StadiumData: IStadium = req.body;
        try {
            const stadium = await this.stadium.createStadium(StadiumData);
            res.status(HTTP_STATUS.OK).json(stadium);
        } catch (error) {
            next(error);
        }
    };

    public updateStadium = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const StadiumData: IStadium = req.body;
        try {
            const stadium = await this.stadium.updateStadium(StadiumData, id);
            res.status(HTTP_STATUS.OK).json(stadium);
        } catch (error) {
            next(error);
        }
    };

    public deleteStadium = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.stadium.deleteStadium(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
