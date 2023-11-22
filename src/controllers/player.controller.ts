import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { PlayerService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IPlayer } from '@/interfaces';

export class PlayerController {
    public player = Container.get(PlayerService);

    public getPlayers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const players = await this.player.getPlayers();
            res.status(HTTP_STATUS.OK).json(players);
        } catch (error) {
            next(error);
        }
    };

    public getPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const player = await this.player.getPlayer(id);
            res.status(HTTP_STATUS.OK).json(player);
        } catch (error) {
            next(error);
        }
    };

    public createPlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const PlayerData: IPlayer = req.body;
        try {
            const player = await this.player.createPlayer(PlayerData);
            res.status(HTTP_STATUS.OK).json(player);
        } catch (error) {
            next(error);
        }
    };

    public updatePlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const PlayerData: IPlayer = req.body;
        try {
            const player = await this.player.updatePlayer(PlayerData, id);
            res.status(HTTP_STATUS.OK).json(player);
        } catch (error) {
            next(error);
        }
    };

    public deletePlayer = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.player.deletePlayer(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
