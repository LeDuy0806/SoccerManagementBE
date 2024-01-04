import { SCHEMA, StatisticalTournament } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IStatisticalTournament } from '@/interfaces';
import { ObjectId } from 'mongodb';

export class StatisticalTournamentRepository {
  public async getStatisticalTournaments(): Promise<IStatisticalTournament[]> {
    try {
      const statisticalTournaments = await StatisticalTournament.find();
      if (!statisticalTournaments) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `statisticalTournaments not found`);
      }
      return statisticalTournaments;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getStatisticalTournament(id: string): Promise<IStatisticalTournament> {
    try {
      const tournament = await StatisticalTournament.findById(id)
        .populate({
          path: 'matchMostGoal',
          populate: [
            {
              path: 'teamOne',
              model: SCHEMA.TEAM,
            },
            {
              path: 'teamTwo',
              model: SCHEMA.TEAM,
            },
          ],
        })
        .populate({
          path: 'matchMostCard',
          populate: [
            {
              path: 'teamOne',
              model: SCHEMA.TEAM,
            },
            {
              path: 'teamTwo',
              model: SCHEMA.TEAM,
            },
          ],
        })
        .populate({
          path: 'teamMostGoal',
          populate: {
            path: 'statistical',
            model: SCHEMA.STATISTICALTEAM,
          },
        })
        .populate({
          path: 'teamMostCard',
          populate: {
            path: 'statistical',
            model: SCHEMA.STATISTICALTEAM,
          },
        })
        .populate({
          path: 'playerMostCard',
          populate: {
            path: 'statistical',
            model: SCHEMA.STATISTICALPLAYER,
          },
        })
        .exec();
      if (!tournament) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournament not found`);
      }
      return tournament;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createStatisticalTournament(tournamentData: IStatisticalTournament): Promise<IStatisticalTournament> {
    const {
      totalPlayer,
      totalGoal,
      totalMatches,
      totalCard,
      matchMostGoal,
      matchMostCard,
      goalPerMatch,
      cardPerMatch,
      totalDoubleKick,
      totalHattrick,
      totalPocker,
      teamMostGoal,
      teamMostCard,
      totalYellowCard,
      totalRedCard,
    } = tournamentData;
    // const existsTournamentName = await StatisticalTournament.findOne({
    //     name: tournamentData.tournament,
    // });
    // if (existsTournamentName) {
    //     throw new HttpException(
    //         HTTP_STATUS.UNPROCESSABLE_ENTITY,
    //         `Tournament already exists`,
    //     );
    // }
    const newTournament = new StatisticalTournament({
      totalPlayer,
      totalGoal,
      totalMatches,
      totalCard,
      matchMostGoal,
      matchMostCard,
      goalPerMatch,
      cardPerMatch,
      totalDoubleKick,
      totalHattrick,
      totalPocker,
      teamMostGoal,
      teamMostCard,
      totalYellowCard,
      totalRedCard,
    });
    try {
      const statisticalTournament = await newTournament.save();
      return statisticalTournament;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateStatisticalTournament(
    tournamentData: IStatisticalTournament,
    id: string,
  ): Promise<IStatisticalTournament> {
    const {
      totalPlayer,
      totalGoal,
      totalMatches,
      totalCard,
      matchMostGoal,
      matchMostCard,
      goalPerMatch,
      cardPerMatch,
      totalDoubleKick,
      totalHattrick,
      totalPocker,
      teamMostGoal,
      teamMostCard,
      totalYellowCard,
      totalRedCard,
    } = tournamentData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No statisticalTournament with id: ${id}`);
    }

    const newTournament = new StatisticalTournament({
      totalPlayer,
      totalGoal,
      totalMatches,
      totalCard,
      matchMostGoal,
      matchMostCard,
      goalPerMatch,
      cardPerMatch,
      totalDoubleKick,
      totalHattrick,
      totalPocker,
      teamMostGoal,
      teamMostCard,
      totalYellowCard,
      totalRedCard,
    });
    try {
      const updateTournament = await StatisticalTournament.findByIdAndUpdate(id, newTournament, {
        new: true,
      });
      return updateTournament!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteStatisticalTournament(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No StatisticalTournament with id: ${id}`);
    }

    try {
      await StatisticalTournament.findByIdAndRemove(id);
      return 'StatisticalTournament deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
