import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { CoachService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { ICoach } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class CoachController {
  public coach = Container.get(CoachService);

  public getCoaches = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const coaches = await this.coach.getCoaches();
      res.status(HTTP_STATUS.OK).json({ data: coaches, status: HTTP_STATUS.OK, message: 'get coaches successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getCoach = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const coach = await this.coach.getCoach(id);
      res.status(HTTP_STATUS.OK).json({ data: coach, status: HTTP_STATUS.OK, message: 'get coach successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createCoach = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const CoachData: ICoach = req.body;
    try {
      const coach = await this.coach.createCoach(CoachData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: coach, status: HTTP_STATUS.CREATED, message: 'create coach successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateCoach = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const CoachData: ICoach = req.body;
    try {
      const coach = await this.coach.updateCoach(CoachData, id);
      res.status(HTTP_STATUS.OK).json({ data: coach, status: HTTP_STATUS.OK, message: 'update coach successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCoach = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.coach.deleteCoach(id);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delete coach successfully' });
    } catch (error) {
      next(error);
    }
  };
}
