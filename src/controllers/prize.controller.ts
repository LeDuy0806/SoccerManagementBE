import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { PrizeRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { IPrize } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class PrizeController {
  public prize = Container.get(PrizeRepository);

  public getPrizes = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const prizes = await this.prize.getPrizes();
      res.status(HTTP_STATUS.OK).json({ data: prizes, status: HTTP_STATUS.OK, message: 'get prizes successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getPrize = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const prize = await this.prize.getPrize(id);
      res.status(HTTP_STATUS.OK).json({ data: prize, status: HTTP_STATUS.OK, message: 'get prize successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createPrize = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const PrizeData: IPrize = req.body;
    try {
      const prize = await this.prize.createPrize(PrizeData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: prize, status: HTTP_STATUS.CREATED, message: 'create prize successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updatePrize = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const PrizeData: IPrize = req.body;
    try {
      const prize = await this.prize.updatePrize(PrizeData, id);
      res.status(HTTP_STATUS.OK).json({ data: prize, status: HTTP_STATUS.OK, message: 'update prize successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deletePrize = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.prize.deletePrize(id);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delete prize successfully' });
    } catch (error) {
      next(error);
    }
  };
}
