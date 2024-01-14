import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { TeamRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { ITeam } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class TeamController {
  public team = Container.get(TeamRepository);

  public getTeams = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const teams = await this.team.getTeams();
      res.status(HTTP_STATUS.OK).json({
        data: teams,
        status: HTTP_STATUS.OK,
        message: 'get teams successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTeamsByOwnerId = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const teams = await this.team.getTeamsByOwnerId(id);
      res.status(HTTP_STATUS.OK).json({
        data: teams,
        status: HTTP_STATUS.OK,
        message: 'get teams successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTeamsByTags = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { tags }: any = req.params;
    try {
      const teams = await this.team.getTeamsByTag(tags);
      res.status(HTTP_STATUS.OK).json({
        data: teams,
        status: HTTP_STATUS.OK,
        message: 'get teams by tags successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const team = await this.team.getTeam(id);
      res.status(HTTP_STATUS.OK).json({
        data: team,
        status: HTTP_STATUS.OK,
        message: 'get team successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public createTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const teamData: ITeam = req.body;
    // console.log(teamData);
    try {
      const team = await this.team.createTeam(teamData);
      res.status(HTTP_STATUS.CREATED).json({
        data: team,
        status: HTTP_STATUS.CREATED,
        message: 'create team successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const teamData: ITeam = req.body;

    try {
      const team = await this.team.updateTeam(teamData, id);
      res.status(HTTP_STATUS.OK).json({
        data: team,
        status: HTTP_STATUS.OK,
        message: 'update team successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.team.deleteTeam(id);
      res.status(HTTP_STATUS.OK).json({
        data: result,
        status: HTTP_STATUS.OK,
        message: 'delete team successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
