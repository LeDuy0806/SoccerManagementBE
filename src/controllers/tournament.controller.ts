import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { TournamentService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { ITournament } from '@/interfaces';
import { TournamentFormat } from '@/types/request';

export class TournamentController {
    public tournament = Container.get(TournamentService);

    public getTournaments = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const tournaments = await this.tournament.getTournaments();
            res.status(HTTP_STATUS.OK).json(tournaments);
        } catch (error) {
            next(error);
        }
    };

    public getTournamentsFormat = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const format: TournamentFormat = req.body;
        try {
            const tournaments =
                await this.tournament.getTournamentsFormat(format);
            res.status(HTTP_STATUS.OK).json(tournaments);
        } catch (error) {
            next(error);
        }
    };

    public getTournament = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const tournament = await this.tournament.getTournament(id);
            res.status(HTTP_STATUS.OK).json(tournament);
        } catch (error) {
            next(error);
        }
    };

    public createTournament = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const tournamentData: ITournament = req.body;
        try {
            const tournament =
                await this.tournament.createTournament(tournamentData);
            res.status(HTTP_STATUS.OK).json(tournament);
        } catch (error) {
            next(error);
        }
    };

    public updateTournament = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const tournamentData: ITournament = req.body;
        try {
            const tournament = await this.tournament.updateTournament(
                tournamentData,
                id,
            );
            res.status(HTTP_STATUS.OK).json(tournament);
        } catch (error) {
            next(error);
        }
    };

    public deleteTournament = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.tournament.deleteTournament(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
