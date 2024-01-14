import { InitStatisticalTournament, Team, Tournament } from '@/models/schema';
import Container, { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { CreateTournamentDto, ETypeStatusTour, FormulaTitle, IStatisticalTournament, ITournament } from '@/interfaces';
import { ObjectId } from 'mongodb';
import { TournamentFormat } from '@/types/request';
import { tranformToTag } from '@/utils/tranformToTag';
import { StatisticalTournamentController } from '@/controllers';
import { StatisticalTournamentRepository } from './statisticalTournament.repository';

@Service()
export class TournamentRepository {
  public statisticalTournament = Container.get(StatisticalTournamentRepository);

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

  public async createTournament(tournamentData: CreateTournamentDto): Promise<ITournament> {
    try {
      const existsTournamentName = await Tournament.findOne({
        name: tournamentData.name,
      });
      if (existsTournamentName) {
        throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Name already exists`);
      }

      const { formula, name, image, logo, prizes, vision, teams, stadiums, referees, sponsor, maxTeam } =
        tournamentData;
      let status;
      if (teams.length < maxTeam) {
        status = ETypeStatusTour.REGISTERING;
      } else {
        status = ETypeStatusTour.ACTIVE;
      }
      const currentYear = new Date().getFullYear();
      const season = `${currentYear}-${currentYear + 1}`;
      const description = `${FormulaTitle.get(formula)} || Bóng Đá Sân 7 || Admin Myleague || ${name}`;
      const tags = tranformToTag(name);

      const createData: Partial<ITournament> = {
        name,
        image,
        logo,
        awardPlayers: [],
        awardTeams: [],
        rounds: [],
        formula,
        vision,
        teams: teams as any,
        stadiums: stadiums as any,
        referees: referees as any,
        prizes: prizes as any,
        status,
        season,
        maxTeam,
        description,
        tags,
      };

      if (Boolean(sponsor)) {
        createData.sponsor = sponsor as any;
      }

      let totalPlayer = 0;
      if (teams && teams.length > 0) {
        const teamsData = await Team.find({ _id: { $in: teams.map(itemId => new ObjectId(itemId)) } });
        totalPlayer = teamsData.reduce((prevValue, team) => prevValue + team.players.length, 0);
      }

      const newStatisticalTour = await this.statisticalTournament.createStatisticalTournament({
        cardPerMatch: 0,
        goalPerMatch: 0,
        matchMostCard: [],
        matchMostGoal: [],
        playerMostCard: [],
        teamMostCard: [],
        teamMostGoal: [],
        totalCard: 0,
        totalDoubleKick: 0,
        totalGoal: 0,
        totalHattrick: 0,
        totalMatches: 0,
        totalOwN: 0,
        totalPlayer: totalPlayer,
        totalPocker: 0,
        totalRedCard: 0,
        totalYellowCard: 0,
      });

      createData.statistical = newStatisticalTour._id.toString() as any;

      const newTournament = new Tournament(createData);

      const tournament = await newTournament.save();
      return tournament;
    } catch (error) {
      console.log(error);
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
