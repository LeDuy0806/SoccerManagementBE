import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { RoundRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { IRound } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class RoundController {
  public round = Container.get(RoundRepository);

  public getRoundStage = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const roundStage = await this.round.getRoundStage();
      res
        .status(HTTP_STATUS.OK)
        .json({ data: roundStage, status: HTTP_STATUS.OK, message: 'get round stage successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getRounds = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const roundStage = await this.round.getRoundStage();
      res.status(HTTP_STATUS.OK).json({ data: roundStage, status: HTTP_STATUS.OK, message: 'get rounds successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getRoundsByTags = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { tags }: any = req.params;
    try {
      const rounds = await this.round.getRoundsByTags(tags);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: rounds, status: HTTP_STATUS.OK, message: 'get rounds by tags successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getRound = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const round = await this.round.getRound(id);
      res.status(HTTP_STATUS.OK).json({ data: round, status: HTTP_STATUS.OK, message: 'get round successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createRound = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const roundData: IRound = req.body;
    try {
      const round = await this.round.createRound(roundData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: round, status: HTTP_STATUS.CREATED, message: 'create round successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateRound = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const roundData: IRound = req.body;
    try {
      const round = await this.round.updateRound(roundData, id);
      res.status(HTTP_STATUS.OK).json({ data: round, status: HTTP_STATUS.OK, message: 'update round successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRound = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.round.deleteRound(id);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delete round successfully' });
    } catch (error) {
      next(error);
    }
  };
}
