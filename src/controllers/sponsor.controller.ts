import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { SponsorService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { ISponsor } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class SponsorController {
  public sponsor = Container.get(SponsorService);

  public getSponsors = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const sponsors = await this.sponsor.getSponsors();
      res.status(HTTP_STATUS.OK).json({ data: sponsors, status: HTTP_STATUS.OK, message: 'get sponsors successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getSponsor = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const sponsor = await this.sponsor.getSponsor(id);
      res.status(HTTP_STATUS.OK).json({ data: sponsor, status: HTTP_STATUS.OK, message: 'get sponsor successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createSponsor = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const SponsorData: ISponsor = req.body;
    try {
      const sponsor = await this.sponsor.createSponsor(SponsorData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: sponsor, status: HTTP_STATUS.CREATED, message: 'create sponsor successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateSponsor = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const SponsorData: ISponsor = req.body;
    try {
      const sponsor = await this.sponsor.updateSponsor(SponsorData, id);
      res
        .status(HTTP_STATUS.OK)
        .json({ data: sponsor, status: HTTP_STATUS.OK, message: 'update sponsor successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSponsor = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.sponsor.deleteSponsor(id);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delete sponsor successfully' });
    } catch (error) {
      next(error);
    }
  };
}
