import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { AwardPlayerService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IAwardPlayer } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class AwardPlayerController {
  public awardPlayer = Container.get(AwardPlayerService);

  public getAwardPlayers = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const awardPlayers = await this.awardPlayer.getAwardPlayers();
      res
        .status(HTTP_STATUS.OK)
        .json({ data: awardPlayers, status: HTTP_STATUS.OK, message: 'get award players successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAwardPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const awardPlayer = await this.awardPlayer.getAwardPlayer(id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: awardPlayer, status: HTTP_STATUS.OK, message: 'get award player by id successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createAwardPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const AwardPlayerData: IAwardPlayer = req.body;
    try {
      const awardPlayer = await this.awardPlayer.createAwardPlayer(AwardPlayerData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: awardPlayer, status: HTTP_STATUS.CREATED, message: 'create award player successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateAwardPlayer = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const awardPlayerData: IAwardPlayer = req.body;
    try {
      const awardPlayer = await this.awardPlayer.updateAwardPlayer(awardPlayerData, id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: awardPlayer, status: HTTP_STATUS.OK, message: 'update award player successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUpdate = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.awardPlayer.deleteAwardPlayer(id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: result, status: HTTP_STATUS.OK, message: 'delete award player successfully' });
    } catch (error) {
      next(error);
    }
  };
}
