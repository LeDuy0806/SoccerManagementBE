import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { AwardPlayerService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IAwardPlayer } from '@/interfaces';

export class AwardPlayerController {
    public awardPlayer = Container.get(AwardPlayerService);

    public getAwardPlayers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const awardPlayers = await this.awardPlayer.getAwardPlayers();
            res.status(HTTP_STATUS.OK).json(awardPlayers);
        } catch (error) {
            next(error);
        }
    };

    public getAwardPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const awardPlayer = await this.awardPlayer.getAwardPlayer(id);
            res.status(HTTP_STATUS.OK).json(awardPlayer);
        } catch (error) {
            next(error);
        }
    };

    public createAwardPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const AwardPlayerData: IAwardPlayer = req.body;
        try {
            const awardPlayer =
                await this.awardPlayer.createAwardPlayer(AwardPlayerData);
            res.status(HTTP_STATUS.OK).json(awardPlayer);
        } catch (error) {
            next(error);
        }
    };

    public updateAwardPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const awardPlayerData: IAwardPlayer = req.body;
        try {
            const awardPlayer = await this.awardPlayer.updateAwardPlayer(
                awardPlayerData,
                id,
            );
            res.status(HTTP_STATUS.OK).json(awardPlayer);
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
            const result = await this.awardPlayer.deleteAwardPlayer(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
