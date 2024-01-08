import { Player } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IPlayer } from '@/interfaces';
import { ObjectId } from 'mongodb';

export class PlayerRepository {
  public async getPlayers(): Promise<IPlayer[]> {
    try {
      const players = await Player.find();
      if (!players) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `players not found`);
      }
      return players;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getPlayersByTags(tags: string): Promise<IPlayer[]> {
    try {
      const players = await Player.find({
        tags: tags,
      });
      if (!players) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `Players not found`);
      }
      return players;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getPlayersByTagsAndPosition(tags: string, position: string): Promise<IPlayer[]> {
    try {
      const players = await Player.find({
        tags: tags,
        position: position,
      });
      if (!players) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `Players not found`);
      }
      return players;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getPlayer(id: string): Promise<IPlayer> {
    try {
      const player = await Player.findById(id);
      if (!player) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `Player not found`);
      }
      return player;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createPlayer(playerData: IPlayer): Promise<IPlayer> {
    const { name, avatar, age, height, national, number, dob, position, statistical } = playerData;
    const existsPlayerName = await Player.findOne({
      name: playerData.name,
    });
    if (existsPlayerName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Player already exists`);
    }
    const newPlayer = new Player({
      name,
      avatar,
      age,
      height,
      national,
      number,
      dob,
      position,
      statistical,
    });
    try {
      const Player = await newPlayer.save();
      return Player;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updatePlayer(playerData: IPlayer, id: string): Promise<IPlayer> {
    const { name, avatar, age, height, national, number, dob, position, statistical } = playerData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Player with id: ${id}`);
    }

    const newPlayer = new Player({
      name,
      avatar,
      age,
      height,
      national,
      number,
      dob,
      position,
      statistical,
    });
    try {
      const updatePlayer = await Player.findByIdAndUpdate(id, newPlayer, {
        new: true,
      });
      return updatePlayer!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deletePlayer(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No player with id: ${id}`);
    }

    try {
      await Player.findByIdAndRemove(id);
      return 'Player deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
