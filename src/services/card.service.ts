import { Card } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { ICard } from '@/interfaces';
import { ObjectId } from 'mongodb';
@Service()
export class CardService {
  public async getCards(): Promise<ICard[]> {
    try {
      const cards = await Card.find();
      if (!cards) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `cards not found`);
      }
      return cards;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getCard(id: string): Promise<ICard> {
    try {
      const card = await Card.findById(id);
      if (!card) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `Card not found`);
      }
      return card;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createCard(CardData: ICard): Promise<ICard> {
    const { type, player, match, number, time } = CardData;
    const newCard = new Card({
      type,
      player,
      number,
      match,
      time,
    });
    try {
      const card = await newCard.save();
      return card;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateCard(CardData: ICard, id: string): Promise<ICard> {
    const { type, player, match, number, time } = CardData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Card with id: ${id}`);
    }

    const newCard = new Card({
      type,
      player,
      match,
      number,
      time,
    });
    try {
      const updateCard = await Card.findByIdAndUpdate(id, newCard, {
        new: true,
      });
      return updateCard!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteCard(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Card with id: ${id}`);
    }

    try {
      await Card.findByIdAndRemove(id);
      return 'card deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
