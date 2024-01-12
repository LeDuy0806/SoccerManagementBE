import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { PlayerRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { IPlayer } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class PlayerController {
  public player = Container.get(PlayerRepository);

  public getPlayers = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const players = await this.player.getPlayers();
      res.status(HTTP_STATUS.OK).json({ data: players, status: HTTP_STATUS.OK, message: 'get players successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getPlayersByTags = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { tags }: any = req.params;
    try {
      const players = await this.player.getPlayersByTags(tags);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: players, status: HTTP_STATUS.OK, message: 'get players by tags successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getPlayersByTagsAndPosition = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { tags, position }: any = req.params;
    try {
      const players = await this.player.getPlayersByTagsAndPosition(tags, position);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: players, status: HTTP_STATUS.OK, message: 'get players by tags and position successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const player = await this.player.getPlayer(id);
      res.status(HTTP_STATUS.OK).json({ data: player, status: HTTP_STATUS.OK, message: 'get player successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const playersData: IPlayer[] = req.body.players;
    const idTeam: string = req.body.idTeam;

    try {
      const player = await this.player.createPlayer(playersData, idTeam);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: player, status: HTTP_STATUS.CREATED, message: 'create player successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updatePlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const PlayerData: IPlayer = req.body;
    try {
      const player = await this.player.updatePlayer(PlayerData, id);
      res.status(HTTP_STATUS.OK).json({ data: player, status: HTTP_STATUS.OK, message: 'update player successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deletePlayerByOwner = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id, idTeam } = req.params;
    try {
      const result = await this.player.deletePlayerByOwner(id, idTeam);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delete player successfully' });
    } catch (error) {
      next(error);
    }
  };
}
