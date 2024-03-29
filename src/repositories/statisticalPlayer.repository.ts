import { Player, StatisticalPlayer } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IStatisticalPLayer } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class StatisticalPlayerRepository {
  public async getStatisticalPlayers(): Promise<IStatisticalPLayer[]> {
    try {
      const statisticalPlayers = await StatisticalPlayer.find();
      if (!statisticalPlayers) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `statisticalPlayers not found`);
      }
      return statisticalPlayers;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getStatisticalPlayersByTags(tags: string): Promise<IStatisticalPLayer[]> {
    try {
      const statisticalPlayers = await StatisticalPlayer.find({
        tags: tags,
      })
        .populate('player')
        .populate('team')
        .exec();
      if (!statisticalPlayers) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `statisticalPlayers not found`);
      }
      return statisticalPlayers;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getStatisticalPlayer(id: string): Promise<IStatisticalPLayer> {
    try {
      const statisticalPlayer = await StatisticalPlayer.findById(id);
      if (!StatisticalPlayer) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `statisticalPlayer not found`);
      }
      return statisticalPlayer!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createStatisticalPlayer(statisticalPlayersData: IStatisticalPLayer[]): Promise<IStatisticalPLayer> {
    // const { player, goals, owner, yellowCards, redCards, voteBestPlayer, voteBestPosition } = StatisticalPlayerData;
    // const existsStatisticalPlayerName = await StatisticalPlayer.findOne({
    //   name: StatisticalPlayerData.player,
    // });
    // if (existsStatisticalPlayerName) {
    //   throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `StatisticalPlayer already exists`);
    // }
    // const newStatisticalPlayer = new StatisticalPlayer({
    //   player,
    //   goals,
    //   owner,
    //   yellowCards,
    //   redCards,
    //   voteBestPlayer,
    //   voteBestPosition,
    // });

    await statisticalPlayersData.map((statistical, index) => {
      const handle = async () => {
        const newStatisticalPlayer = new StatisticalPlayer({
          player: statistical.player,
          team: statistical.team,
          goals: statistical.goals,
          owner: statistical.owner,
          yellowCards: statistical.yellowCards,
          redCards: statistical.redCards,
          voteBestPlayer: statistical.voteBestPlayer,
          voteBestPosition: statistical.voteBestPosition,
          tags: '',
        });

        try {
          const statisticalPlayer = await newStatisticalPlayer.save();
          const player = await Player.findById(statistical.player);
          player.statistical = statisticalPlayer._id;
          await player.save();
          return statisticalPlayer;
        } catch (e) {
          console.log(e);
        }
      };
      handle();
    });

    try {
      const a: any = 'Create Successfully';
      return a;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateStatisticalPlayer(
    StatisticalPlayerData: IStatisticalPLayer,
    id: string,
  ): Promise<IStatisticalPLayer> {
    const { player, goals, owner, yellowCards, redCards, voteBestPlayer, voteBestPosition } = StatisticalPlayerData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No StatisticalPlayer with id: ${id}`);
    }

    const newStatisticalPlayer = new StatisticalPlayer({
      player,
      goals,
      owner,
      yellowCards,
      redCards,
      voteBestPlayer,
      voteBestPosition,
    });
    try {
      const updateStatisticalPlayer = await StatisticalPlayer.findByIdAndUpdate(id, newStatisticalPlayer, {
        new: true,
      });
      return updateStatisticalPlayer!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteStatisticalPlayer(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No StatisticalPlayer with id: ${id}`);
    }

    try {
      await StatisticalPlayer.findByIdAndRemove(id);
      return 'StatisticalPlayer deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
