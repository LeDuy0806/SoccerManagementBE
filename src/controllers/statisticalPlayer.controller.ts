import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { StatisticalPlayerService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IStatisticalPLayer } from '@/interfaces';

export class StatisticalPlayerController {
    public statisticalPlayer = Container.get(StatisticalPlayerService);

    public getStatisticalPlayers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const StatisticalPlayers =
                await this.statisticalPlayer.getStatisticalPlayers();
            res.status(HTTP_STATUS.OK).json(StatisticalPlayers);
        } catch (error) {
            next(error);
        }
    };

    public getStatisticalTeamsByTags = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { tags }: any = req.params;
        try {
            const statisticalTeams =
                await this.statisticalPlayer.getStatisticalPlayersByTags(tags);
            res.status(HTTP_STATUS.OK).json(statisticalTeams);
        } catch (error) {
            next(error);
        }
    };

    public getStatisticalPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const statisticalPlayer =
                await this.statisticalPlayer.getStatisticalPlayer(id);
            res.status(HTTP_STATUS.OK).json(statisticalPlayer);
        } catch (error) {
            next(error);
        }
    };

    public createStatisticalPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const statisticalPlayerData: IStatisticalPLayer = req.body;
        try {
            const statisticalPlayer =
                await this.statisticalPlayer.createStatisticalPlayer(
                    statisticalPlayerData,
                );
            res.status(HTTP_STATUS.OK).json(statisticalPlayer);
        } catch (error) {
            next(error);
        }
    };

    public updateStatisticalPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const statisticalPlayerData: IStatisticalPLayer = req.body;
        try {
            const statisticalPlayer =
                await this.statisticalPlayer.updateStatisticalPlayer(
                    statisticalPlayerData,
                    id,
                );
            res.status(HTTP_STATUS.OK).json(statisticalPlayer);
        } catch (error) {
            next(error);
        }
    };

    public deleteStatisticalPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result =
                await this.statisticalPlayer.deleteStatisticalPlayer(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
