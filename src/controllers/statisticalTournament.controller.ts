import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { StatisticalTournamentService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IStatisticalTournament } from '@/interfaces';

export class StatisticalTournamentController {
    public statisticalTournament = Container.get(StatisticalTournamentService);

    public getStatisticalTournaments = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const statisticalTournaments =
                await this.statisticalTournament.getStatisticalTournaments();
            res.status(HTTP_STATUS.OK).json(statisticalTournaments);
        } catch (error) {
            next(error);
        }
    };

    public getStatisticalTournament = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const statisticalTournament =
                await this.statisticalTournament.getStatisticalTournament(id);
            res.status(HTTP_STATUS.OK).json(statisticalTournament);
        } catch (error) {
            next(error);
        }
    };

    public createstatisticalTournament = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const statisticalTournamentData: IStatisticalTournament = req.body;
        try {
            const statisticalTournament =
                await this.statisticalTournament.createStatisticalTournament(
                    statisticalTournamentData,
                );
            res.status(HTTP_STATUS.OK).json(statisticalTournament);
        } catch (error) {
            next(error);
        }
    };

    public updatestatisticalTournament = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const statisticalTournamentData: IStatisticalTournament = req.body;
        try {
            const statisticalTournament =
                await this.statisticalTournament.updateStatisticalTournament(
                    statisticalTournamentData,
                    id,
                );
            res.status(HTTP_STATUS.OK).json(statisticalTournament);
        } catch (error) {
            next(error);
        }
    };

    public deleteStatisticalTournament = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result =
                await this.statisticalTournament.deleteStatisticalTournament(
                    id,
                );
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
