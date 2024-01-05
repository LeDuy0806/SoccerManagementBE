import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { AwardTeamService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IAwardTeam } from '@/interfaces';

export class AwardTeamController {
    public awardTeam = Container.get(AwardTeamService);

    public getAwardTeams = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const awardTeams = await this.awardTeam.getAwardTeams();
            res.status(HTTP_STATUS.OK).json(awardTeams);
        } catch (error) {
            next(error);
        }
    };

    public getAwardTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const awardTeam = await this.awardTeam.getTeam(id);
            res.status(HTTP_STATUS.OK).json(awardTeam);
        } catch (error) {
            next(error);
        }
    };

    public createAwardTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const awardTeamData: IAwardTeam = req.body;
        try {
            const awardTeam = await this.awardTeam.createTeam(awardTeamData);
            res.status(HTTP_STATUS.OK).json(awardTeam);
        } catch (error) {
            next(error);
        }
    };

    public updateAwardTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const awardTeamData: IAwardTeam = req.body;
        try {
            const awardTeam = await this.awardTeam.updateTeam(
                awardTeamData,
                id,
            );
            res.status(HTTP_STATUS.OK).json(awardTeam);
        } catch (error) {
            next(error);
        }
    };

    public deleteAwardTeam = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.awardTeam.deleteTeam(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
