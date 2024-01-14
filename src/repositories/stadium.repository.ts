import { Stadium } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IStadium } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class StadiumRepository {
  public async getStadiums(): Promise<IStadium[]> {
    try {
      const stadiums = await Stadium.find();
      if (!stadiums) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `stadiums not found`);
      }
      return stadiums;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getStadium(id: string): Promise<IStadium> {
    try {
      const stadium = await Stadium.findById(id);
      if (!stadium) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `stadium not found`);
      }
      return stadium;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createStadium(stadiumData: IStadium): Promise<IStadium> {
    const { name, avatar, location, capacity, coordinate } = stadiumData;
    const existsStadiumName = await Stadium.findOne({
      name: stadiumData.name,
    });
    if (existsStadiumName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Stadium already exists`);
    }
    const newStadium = new Stadium({
      name,
      avatar,
      location,
      capacity,
      coordinate,
    });
    try {
      const stadium = await newStadium.save();
      return stadium;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateStadium(stadiumData: IStadium, id: string): Promise<IStadium> {
    const { name, avatar, location, capacity, coordinate } = stadiumData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Stadium with id: ${id}`);
    }

    const newStadium = new Stadium({
      name,
      avatar,
      location,
      capacity,
      coordinate,
    });
    try {
      const updateStadium = await Stadium.findByIdAndUpdate(id, newStadium, {
        new: true,
      });
      return updateStadium!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteStadium(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No stadium with id: ${id}`);
    }

    try {
      await Stadium.findByIdAndRemove(id);
      return 'stadium deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
