import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { TeamService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { ITeam } from '@/interfaces';

export class TeamController {
    public team = Container.get(TeamService);

    public getTeams = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const teams = await this.team.getTeams();
            res.status(HTTP_STATUS.OK).json(teams);
        } catch (error) {
            next(error);
        }
    };

    public getTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const team = await this.team.getTeam(id);
            res.status(HTTP_STATUS.OK).json(team);
        } catch (error) {
            next(error);
        }
    };

    public createTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const teamData: ITeam = req.body;
        try {
            const team = await this.team.createTeam(teamData);
            res.status(HTTP_STATUS.OK).json(team);
        } catch (error) {
            next(error);
        }
    };

    public updateTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const teamData: ITeam = req.body;
        try {
            const team = await this.team.updateTeam(teamData, id);
            res.status(HTTP_STATUS.OK).json(team);
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
            const result = await this.team.deleteTeam(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
