import { Tournament } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { ITournament } from '@/interfaces';
import { ObjectId } from 'mongodb';
import { TournamentFormat } from '@/types/request';

@Service()
export class TournamentService {
  public async getTournaments(): Promise<ITournament[]> {
    try {
      const tournaments = await Tournament.find()
        .populate('prizes')
        .populate('teams')
        .populate('sponsor')
        .populate('referees')
        .populate('stadiums')
        .exec();
      if (!tournaments) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
      }
      return tournaments;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getTournamentsFormat(format: TournamentFormat): Promise<ITournament[]> {
    try {
      if (!format.formula || !format.status || !format.vision) {
        if (!format.formula && !format.status && !format.vision) {
          const tournaments = await Tournament.find();
          if (!tournaments) {
            throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
          }
          return tournaments;
        }
        if (format.formula && !format.status && !format.vision) {
          const tournaments = await Tournament.find({
            formula: format.formula,
          });
          if (!tournaments) {
            throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
          }
          return tournaments;
        }
        if (!format.formula && !format.status && format.vision) {
          const tournaments = await Tournament.find({
            vision: format.vision,
          });
          if (!tournaments) {
            throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
          }
          return tournaments;
        }
        if (!format.formula && format.status && !format.vision) {
          const tournaments = await Tournament.find({
            status: format.status,
          });
          if (!tournaments) {
            throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
          }
          return tournaments;
        }
        if (!format.formula && format.status && format.vision) {
          const tournaments = await Tournament.find({
            status: format.status,
            vision: format.vision,
          });
          if (!tournaments) {
            throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
          }
          return tournaments;
        }
        if (format.formula && format.status && !format.vision) {
          const tournaments = await Tournament.find({
            status: format.status,
            formula: format.formula,
          });
          if (!tournaments) {
            throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
          }
          return tournaments;
        }
        if (format.formula && !format.status && format.vision) {
          const tournaments = await Tournament.find({
            vision: format.vision,
            formula: format.formula,
          });
          if (!tournaments) {
            throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
          }
          return tournaments;
        }
      } else {
        const tournaments = await Tournament.find({
          formula: format.formula,
          vision: format.vision,
          status: format.status,
        });
        if (!tournaments) {
          throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournaments not found`);
        }
        return tournaments;
      }
      return [];
    } catch (e) {
      console.log(e);
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getTournament(id: string): Promise<ITournament> {
    try {
      const tournament = await Tournament.findById(id);
      if (!tournament) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `tournament not found`);
      }
      return tournament;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createTournament(tournamentData: ITournament): Promise<ITournament> {
    const { formula, name, awardPlayers, awardTeams, prizes, status, sponsor, rounds, season } = tournamentData;
    const existsTournamentName = await Tournament.findOne({
      name: tournamentData.name,
    });
    if (existsTournamentName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Name already exists`);
    }
    const newTournament = new Tournament({
      formula,
      name,
      awardPlayers,
      awardTeams,
      prizes,
      status,
      sponsor,
      rounds,
      season,
    });
    try {
      const tournament = await newTournament.save();
      return tournament;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateTournament(tournamentData: ITournament, id: string): Promise<ITournament> {
    const { formula, name, awardPlayers, awardTeams, prizes, status, sponsor, rounds, season } = tournamentData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No tournament with id: ${id}`);
    }

    const newTournament = new Tournament({
      formula,
      name,
      awardPlayers,
      awardTeams,
      prizes,
      status,
      sponsor,
      rounds,
      season,
    });
    try {
      const updateTournament = await Tournament.findByIdAndUpdate(id, newTournament, {
        new: true,
      });
      return updateTournament!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteTournament(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No tournament with id: ${id}`);
    }

    try {
      await Tournament.findByIdAndRemove(id);
      return 'Tournament deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
