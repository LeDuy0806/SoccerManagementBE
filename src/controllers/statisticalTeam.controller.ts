import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { StatisticalTeamService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IStatisticalTeam } from '@/interfaces';

export class StatisticalTeamController {
    public statisticalTeam = Container.get(StatisticalTeamService);

    public getStatisticalTeams = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const statisticalTeams =
                await this.statisticalTeam.getStatisticalTeams();
            res.status(HTTP_STATUS.OK).json(statisticalTeams);
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
                await this.statisticalTeam.getStatisticalTeamsByTag(tags);
            res.status(HTTP_STATUS.OK).json(statisticalTeams);
        } catch (error) {
            next(error);
        }
    };

    public getStatisticalTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const statisticalTeam =
                await this.statisticalTeam.getStatisticalTeam(id);
            res.status(HTTP_STATUS.OK).json(statisticalTeam);
        } catch (error) {
            next(error);
        }
    };

    public createstatisticalTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const statisticalTeamData: IStatisticalTeam = req.body;
        try {
            const statisticalTeam =
                await this.statisticalTeam.createStatisticalTeam(
                    statisticalTeamData,
                );
            res.status(HTTP_STATUS.OK).json(statisticalTeam);
        } catch (error) {
            next(error);
        }
    };

    public updatestatisticalTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const statisticalTeamData: IStatisticalTeam = req.body;
        try {
            const statisticalTeam =
                await this.statisticalTeam.updateStatisticalTeam(
                    statisticalTeamData,
                    id,
                );
            res.status(HTTP_STATUS.OK).json(statisticalTeam);
        } catch (error) {
            next(error);
        }
    };

    public deleteStatisticalTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.statisticalTeam.deleteStatisticalTeam(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
