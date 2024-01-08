import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { AwardTeamRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { IAwardTeam } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class AwardTeamController {
  public awardTeam = Container.get(AwardTeamRepository);

  public getAwardTeams = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const awardTeams = await this.awardTeam.getAwardTeams();
      res
        .status(HTTP_STATUS.OK)
        .json({ data: awardTeams, status: HTTP_STATUS.OK, message: 'get award teams successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAwardTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const awardTeam = await this.awardTeam.getTeam(id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: awardTeam, status: HTTP_STATUS.OK, message: 'get award team successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createAwardTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const awardTeamData: IAwardTeam = req.body;
    try {
      const awardTeam = await this.awardTeam.createTeam(awardTeamData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: awardTeam, status: HTTP_STATUS.CREATED, message: 'create award team successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateAwardTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const awardTeamData: IAwardTeam = req.body;
    try {
      const awardTeam = await this.awardTeam.updateTeam(awardTeamData, id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: awardTeam, status: HTTP_STATUS.OK, message: 'update award teams successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAwardTeam = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.awardTeam.deleteTeam(id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: result, status: HTTP_STATUS.OK, message: 'delete award teams successfully' });
    } catch (error) {
      next(error);
    }
  };
}
