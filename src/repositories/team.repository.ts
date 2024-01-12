import { SCHEMA, Team } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { ITeam } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class TeamRepository {
  public async getTeams(): Promise<ITeam[]> {
    try {
      const teams = await Team.find();
      if (!teams) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `teams not found`);
      }
      return teams;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getTeamsByTag(tags: string): Promise<ITeam[]> {
    try {
      const teams = await Team.find({ tags: tags })
        .populate('coach')
        .populate({
          path: 'players',
          populate: {
            path: 'statistical',
            model: SCHEMA.STATISTICALPLAYER,
          },
        })
        .populate({
          path: 'matches',
          populate: [
            {
              path: 'teamOne',
              model: SCHEMA.TEAM,
            },
            {
              path: 'teamTwo',
              model: SCHEMA.TEAM,
            },
            {
              path: 'mainReferee',
              model: SCHEMA.REFEREE,
            },
            {
              path: 'stadium',
              model: SCHEMA.STADIUM,
            },
            {
              path: 'cardsTeamOne',
              model: SCHEMA.CARD,
            },
            {
              path: 'cardsTeamTwo',
              model: SCHEMA.CARD,
            },
            {
              path: 'goalsTeamOne',
              model: SCHEMA.GOAL,
            },
            {
              path: 'goalsTeamTwo',
              model: SCHEMA.GOAL,
            },
          ],
        })
        .populate('statistical')
        .exec();
      if (!teams) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `teams not found`);
      }
      return teams;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getTeam(id: string): Promise<ITeam> {
    try {
      const team = await Team.findById(id).populate('representative').populate('coach').populate('players').exec();
      if (!team) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `team not found`);
      }
      return team;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createTeam(teamData: ITeam): Promise<ITeam> {
    const {
      name,
      flag,
      rank,
      coach,
      stadium,
      players,
      matches,
      statistical,
      representative,
      level,
      area,
      isPublic,
      uniform,
    } = teamData;
    const existsTeamName = await Team.findOne({
      name: teamData.name,
    });
    if (existsTeamName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Team already exists`);
    }
    const newTeam = new Team({
      name,
      flag,
      rank,
      area,
      level,
      uniform,
      isPublic: isPublic === 'PUBLIC' ? true : false,
      coach,
      stadium,
      players,
      matches,
      statistical,
      representative,
    });
    try {
      const team = await newTeam.save();
      return team;
    } catch (e) {
      console.log(e);
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateTeam(teamData: ITeam, id: string): Promise<ITeam> {
    const { name, flag, rank, coach, stadium, players, matches, statistical, uniform } = teamData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Team with id: ${id}`);
    }

    const newTeam = new Team({
      name,
      flag,
      rank,
      coach,
      stadium,
      uniform,
      players,
      matches,
      statistical,
    });
    try {
      const updateTeam = await Team.findByIdAndUpdate(id, newTeam, {
        new: true,
      });
      return updateTeam!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteTeam(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Team with id: ${id}`);
    }

    try {
      await Team.findByIdAndRemove(id);
      return 'Team deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
