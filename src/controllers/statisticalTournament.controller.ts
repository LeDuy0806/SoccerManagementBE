import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { StatisticalTournamentService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IStatisticalTournament } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class StatisticalTournamentController {
  public statisticalTournament = Container.get(StatisticalTournamentService);

  public getStatisticalTournaments = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const statisticalTournaments = await this.statisticalTournament.getStatisticalTournaments();
      res.status(HTTP_STATUS.OK).json({
        data: statisticalTournaments,
        status: HTTP_STATUS.OK,
        message: 'delete statistical tournaments successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getStatisticalTournament = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const statisticalTournament = await this.statisticalTournament.getStatisticalTournament(id);
      res.status(HTTP_STATUS.OK).json({
        data: statisticalTournament,
        status: HTTP_STATUS.OK,
        message: 'get statistical tournament successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public createStatisticalTournament = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const statisticalTournamentData: IStatisticalTournament = req.body;
    try {
      const statisticalTournament =
        await this.statisticalTournament.createStatisticalTournament(statisticalTournamentData);
      res.status(HTTP_STATUS.CREATE).json({
        data: statisticalTournament,
        status: HTTP_STATUS.CREATE,
        message: 'create statistical tournament successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateStatisticalTournament = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const statisticalTournamentData: IStatisticalTournament = req.body;
    try {
      const statisticalTournament = await this.statisticalTournament.updateStatisticalTournament(
        statisticalTournamentData,
        id,
      );
      res.status(HTTP_STATUS.OK).json({
        data: statisticalTournament,
        status: HTTP_STATUS.OK,
        message: 'update statistical tournament successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteStatisticalTournament = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.statisticalTournament.deleteStatisticalTournament(id);
      res.status(HTTP_STATUS.OK).json({
        data: result,
        status: HTTP_STATUS.OK,
        message: 'delete statistical tournament successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
