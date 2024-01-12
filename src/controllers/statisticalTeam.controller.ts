import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { StatisticalTeamRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { IStatisticalTeam } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class StatisticalTeamController {
  public statisticalTeam = Container.get(StatisticalTeamRepository);

  public getStatisticalTeams = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const statisticalTeams = await this.statisticalTeam.getStatisticalTeams();
      res
        .status(HTTP_STATUS.OK)
        .json({ data: statisticalTeams, status: HTTP_STATUS.OK, message: 'get statistical teams successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStatisticalTeamsByTags = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { tags }: any = req.params;
    try {
      const statisticalTeams = await this.statisticalTeam.getStatisticalTeamsByTag(tags);
      res.status(HTTP_STATUS.OK).json({
        data: statisticalTeams,
        status: HTTP_STATUS.OK,
        message: 'get statistical teams by tags successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getStatisticalTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const statisticalTeam = await this.statisticalTeam.getStatisticalTeam(id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: statisticalTeam, status: HTTP_STATUS.OK, message: 'get statistical team successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createstatisticalTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const statisticalTeamData: IStatisticalTeam = req.body;
    try {
      const statisticalTeam = await this.statisticalTeam.createStatisticalTeam(statisticalTeamData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: statisticalTeam, status: HTTP_STATUS.CREATE, message: 'create statistical team successfully' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updatestatisticalTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const statisticalTeamData: IStatisticalTeam = req.body;
    try {
      const statisticalTeam = await this.statisticalTeam.updateStatisticalTeam(statisticalTeamData, id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: statisticalTeam, status: HTTP_STATUS.OK, message: 'update statistical team successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStatisticalTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.statisticalTeam.deleteStatisticalTeam(id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: result, status: HTTP_STATUS.OK, message: 'delete statistical team successfully' });
    } catch (error) {
      next(error);
    }
  };
}
