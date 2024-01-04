import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { CardService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { ICard } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class CardController {
  public card = Container.get(CardService);

  public getCards = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const cards = await this.card.getCards();
      res.status(HTTP_STATUS.OK).json({ data: cards, status: HTTP_STATUS.OK, message: 'get cards successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getCard = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const card = await this.card.getCard(id);
      res.status(HTTP_STATUS.OK).json({ data: card, status: HTTP_STATUS.OK, message: 'get card by id successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createCard = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const cardData: ICard = req.body;
    try {
      const card = await this.card.createCard(cardData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: card, status: HTTP_STATUS.CREATED, message: 'create card successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateCard = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const cardData: ICard = req.body;
    try {
      const card = await this.card.updateCard(cardData, id);
      res.status(HTTP_STATUS.OK).json({ data: card, status: HTTP_STATUS.OK, message: 'udpate card successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCard = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.card.deleteCard(id);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delete card successfully' });
    } catch (error) {
      next(error);
    }
  };
}
