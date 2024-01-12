import { Player, StatisticalPlayer, Team } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IPlayer } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
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

  public async createPlayer(playersData: IPlayer[], idTeam: string): Promise<IPlayer[]> {
    const savePlayers: IPlayer[] = [];
    await playersData.map((player, index) => {
      const handle = async () => {
        const newPlayer = new Player({
          avatar: player.avatar,
          captain: player.captain === 'Captain' ? true : false,
          dob: player.dob,
          height: player.height,
          name: player.name,
          national: player.national,
          number: player.number,
          position: player.position,
          tags: player.tags,
          weight: player.weight,
        });

        try {
          const createPlayer = await newPlayer.save();
          savePlayers.push(createPlayer);
        } catch (e) {
          console.log(e);
        }
      };
      handle();
    });

    console.log(idTeam);
    const team = await Team.findById(idTeam);
    await savePlayers.map(player => {
      team.players.push(player._id);
    });

    try {
      await team.save();
      return savePlayers;
    } catch (e) {
      console.log(e);
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

  public async deletePlayerByOwner(id: string, idTeam: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No player with id: ${id}`);
    }

    const player = await Player.findById(id);
    const team = await Team.findById(idTeam);
    team.players = await team.players.filter(player => String(player) !== id);

    try {
      await team.save();
      await StatisticalPlayer.findByIdAndRemove(player.statistical);
      await Player.findByIdAndRemove(id);
      return 'player deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
