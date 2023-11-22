import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { CardService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { ICard } from '@/interfaces';

export class CardController {
    public card = Container.get(CardService);

    public getCards = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const cards = await this.card.getCards();
            res.status(HTTP_STATUS.OK).json(cards);
        } catch (error) {
            next(error);
        }
    };

    public getCard = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const card = await this.card.getCard(id);
            res.status(HTTP_STATUS.OK).json(card);
        } catch (error) {
            next(error);
        }
    };

    public createCard = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const cardData: ICard = req.body;
        try {
            const card = await this.card.createCard(cardData);
            res.status(HTTP_STATUS.OK).json(card);
        } catch (error) {
            next(error);
        }
    };

    public updateCard = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const cardData: ICard = req.body;
        try {
            const card = await this.card.updateCard(cardData, id);
            res.status(HTTP_STATUS.OK).json(card);
        } catch (error) {
            next(error);
        }
    };

    public deleteCard = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.card.deleteCard(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
