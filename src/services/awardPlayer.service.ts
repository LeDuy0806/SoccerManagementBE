import { AwardPlayer } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IAwardPlayer } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class AwardPlayerService {
  public async getAwardPlayers(): Promise<IAwardPlayer[]> {
    try {
      const awardPlayers = AwardPlayer.find();
      if (!awardPlayers) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `awardPlayers not found`);
      }
      return awardPlayers;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getAwardPlayer(id: string): Promise<IAwardPlayer> {
    try {
      const awardPlayer = await AwardPlayer.findById(id);
      if (!awardPlayer) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `awardPlayer not found`);
      }
      return awardPlayer;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createAwardPlayer(awardPlayerData: IAwardPlayer): Promise<IAwardPlayer> {
    const { name } = awardPlayerData;
    const existsAwardPlayerName = await AwardPlayer.findOne({
      name: awardPlayerData.name,
    });
    if (existsAwardPlayerName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `AwardPlayer already exists`);
    }
    const newAwardPlayer = new AwardPlayer({
      name,
    });
    try {
      const awardPlayer = await newAwardPlayer.save();
      return awardPlayer;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateAwardPlayer(awardPlayerData: IAwardPlayer, id: string): Promise<IAwardPlayer> {
    const { name } = awardPlayerData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No awardPlayer with id: ${id}`);
    }

    const newAwardPlayer = new AwardPlayer({
      name,
    });
    try {
      const updateAwardPlayer = await AwardPlayer.findByIdAndUpdate(id, newAwardPlayer, {
        new: true,
      });
      return updateAwardPlayer!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteAwardPlayer(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No awardPlayer with id: ${id}`);
    }

    try {
      await AwardPlayer.findByIdAndRemove(id);
      return 'AwardPlayer deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
