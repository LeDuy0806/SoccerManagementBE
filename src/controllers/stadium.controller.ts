import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { StadiumService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IStadium } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class StadiumController {
  public stadium = Container.get(StadiumService);

  public getStadiums = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const stadiums = await this.stadium.getStadiums();
      res.status(HTTP_STATUS.OK).json({ data: stadiums, status: HTTP_STATUS.OK, message: 'get stadiums successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStadium = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const stadium = await this.stadium.getStadium(id);
      res.status(HTTP_STATUS.OK).json({ data: stadium, status: HTTP_STATUS.OK, message: 'get stadium successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createStadium = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const StadiumData: IStadium = req.body;
    try {
      const stadium = await this.stadium.createStadium(StadiumData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: stadium, status: HTTP_STATUS.CREATED, message: 'create stadium successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateStadium = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const StadiumData: IStadium = req.body;
    try {
      const stadium = await this.stadium.updateStadium(StadiumData, id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: stadium, status: HTTP_STATUS.OK, message: 'update stadium successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStadium = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.stadium.deleteStadium(id);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delete stadium successfully' });
    } catch (error) {
      next(error);
    }
  };
}
