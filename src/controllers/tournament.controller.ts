import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { TournamentRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { CreateTournamentDto, ITournament } from '@/interfaces';
import { TournamentFormat } from '@/types/request';
import { ResponseDto } from '@/dtos/http.dto';

export class TournamentController {
  public tournament = Container.get(TournamentRepository);

  public getTournaments = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const tournaments = await this.tournament.getTournaments();
      res.status(HTTP_STATUS.OK).json({
        data: tournaments,
        status: HTTP_STATUS.OK,
        message: 'get tournaments successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTournamentsFormat = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const format: TournamentFormat = req.body;
    try {
      const tournaments = await this.tournament.getTournamentsFormat(format);
      res.status(HTTP_STATUS.OK).json({
        data: tournaments,
        status: HTTP_STATUS.OK,
        message: 'get tournaments format successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTournament = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const tournament = await this.tournament.getTournament(id);
      res.status(HTTP_STATUS.OK).json({
        data: tournament,
        status: HTTP_STATUS.OK,
        message: 'get tournament successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public createTournament = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const tournamentData: CreateTournamentDto = req.body;
    try {
      const tournament = await this.tournament.createTournament(tournamentData);
      res.status(HTTP_STATUS.CREATED).json({
        data: tournament,
        status: HTTP_STATUS.CREATED,
        message: 'update tournament successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateTournament = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const tournamentData: ITournament = req.body;
    try {
      const tournament = await this.tournament.updateTournament(tournamentData, id);
      res.status(HTTP_STATUS.OK).json({
        data: tournament,
        status: HTTP_STATUS.OK,
        message: 'update tournament successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteTournament = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.tournament.deleteTournament(id);
      res.status(HTTP_STATUS.OK).json({
        data: result,
        status: HTTP_STATUS.OK,
        message: 'delete tournament successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
