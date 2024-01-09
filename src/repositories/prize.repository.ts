import { Prize } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IPrize } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class PrizeRepository {
  public async getPrizes(): Promise<IPrize[]> {
    try {
      const prizes = await Prize.find();
      if (!prizes) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, ` Prize not found`);
      }
      return prizes;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, ` Prize already exists`);
    }
  }

  public async getPrize(id: string): Promise<IPrize> {
    try {
      const prize = await Prize.findById(id);
      if (!prize) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `prize not found`);
      }
      return prize;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createPrize(prizeData: IPrize): Promise<IPrize> {
    const { category, status, completion, bonus, image } = prizeData;
    const existsPrizeCategory = await Prize.findOne({
      name: prizeData.category,
    });
    if (existsPrizeCategory) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Prize already exists`);
    }
    const newPrize = new Prize({
      category,
      status,
      completion,
      bonus,
      image,
    });
    try {
      const prize = await newPrize.save();
      return prize;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updatePrize(prizeData: IPrize, id: string): Promise<IPrize> {
    const { category, status, completion, bonus, image } = prizeData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No prize with id: ${id}`);
    }

    const newPrize = new Prize({
      category,
      status,
      completion,
      bonus,
      image,
    });
    try {
      const updatePrize = await Prize.findByIdAndUpdate(id, newPrize, {
        new: true,
      });
      return updatePrize!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deletePrize(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No prize with id: ${id}`);
    }

    try {
      await Prize.findByIdAndRemove(id);
      return 'prize deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
