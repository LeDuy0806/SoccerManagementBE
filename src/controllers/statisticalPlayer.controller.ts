import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { StatisticalPlayerRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { IStatisticalPLayer } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class StatisticalPlayerController {
  public statisticalPlayer = Container.get(StatisticalPlayerRepository);

  public getStatisticalPlayers = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const statisticalPlayers = await this.statisticalPlayer.getStatisticalPlayers();
      res
        .status(HTTP_STATUS.OK)
        .json({ data: statisticalPlayers, status: HTTP_STATUS.OK, message: 'get statistical players successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStatisticalTeamsByTags = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { tags }: any = req.params;
    try {
      const statisticalTeams = await this.statisticalPlayer.getStatisticalPlayersByTags(tags);
      res.status(HTTP_STATUS.OK).json({
        data: statisticalTeams,
        status: HTTP_STATUS.OK,
        message: 'get statistical teams by tags successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getStatisticalPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const statisticalPlayer = await this.statisticalPlayer.getStatisticalPlayer(id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: statisticalPlayer, status: HTTP_STATUS.OK, message: 'get statistical player successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createStatisticalPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const statisticalPlayerData: IStatisticalPLayer = req.body;
    try {
      const statisticalPlayer = await this.statisticalPlayer.createStatisticalPlayer(statisticalPlayerData);
      res.status(HTTP_STATUS.CREATED).json({
        data: statisticalPlayer,
        status: HTTP_STATUS.CREATED,
        message: 'create statistical player successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateStatisticalPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const statisticalPlayerData: IStatisticalPLayer = req.body;
    try {
      const statisticalPlayer = await this.statisticalPlayer.updateStatisticalPlayer(statisticalPlayerData, id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: statisticalPlayer, status: HTTP_STATUS.OK, message: 'update statistical player successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStatisticalPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.statisticalPlayer.deleteStatisticalPlayer(id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: result, status: HTTP_STATUS.OK, message: 'delete statistical player successfully' });
    } catch (error) {
      next(error);
    }
  };
}
