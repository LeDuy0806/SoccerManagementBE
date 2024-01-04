import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { MatchService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IMatch } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class MatchController {
  public match = Container.get(MatchService);

  public getMatches = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const matches = await this.match.getMatches();
      res.status(HTTP_STATUS.OK).json({ data: matches, status: HTTP_STATUS.OK, message: 'get matches successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getMatch = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const match = await this.match.getMatch(id);
      res.status(HTTP_STATUS.OK).json({ data: match, status: HTTP_STATUS.OK, message: 'get match successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createMatch = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const matchData: IMatch = req.body;
    try {
      const match = await this.match.createMatch(matchData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: match, status: HTTP_STATUS.CREATED, message: 'create match successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateMatch = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const matchData: IMatch = req.body;
    try {
      const match = await this.match.updateMatch(matchData, id);
      res.status(HTTP_STATUS.OK).json({ data: match, status: HTTP_STATUS.OK, message: 'udpate match successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMatch = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.match.deleteMatch(id);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delete match successfully' });
    } catch (error) {
      next(error);
    }
  };
}
