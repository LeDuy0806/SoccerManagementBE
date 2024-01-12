import { StatisticalTeam, Team } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IStatisticalTeam } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class StatisticalTeamRepository {
  public async getStatisticalTeams(): Promise<IStatisticalTeam[]> {
    try {
      const statisticalTeams = await StatisticalTeam.find();
      if (!statisticalTeams) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `statisticalTeams not found`);
      }
      return statisticalTeams;
    } catch (e) {
      console.log(e);
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getStatisticalTeamsByTag(tags: string): Promise<IStatisticalTeam[]> {
    try {
      const statisticalTeams = await StatisticalTeam.find({ tags: tags }).populate('team').exec();
      if (!statisticalTeams) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `statisticalTeams not found`);
      }
      return statisticalTeams;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getStatisticalTeam(id: string): Promise<IStatisticalTeam> {
    try {
      const team = await StatisticalTeam.findById(id);
      if (!team) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `team not found`);
      }
      return team;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createStatisticalTeam(teamData: IStatisticalTeam): Promise<IStatisticalTeam> {
    const {
      team,
      wins,
      draws,
      losses,
      point,
      goals,
      matches,
      losts,
      owns,
      yellowCards,
      redCards,
      rank,
      voteChampions,
      voteFairPlays,
    } = teamData;
    // const existsTeamName = await StatisticalTeam.findOne({
    //   name: teamData.team,
    // });
    // if (existsTeamName) {
    //   throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Team already exists`);
    // }
    const newTeam = new StatisticalTeam({
      team,
      wins,
      draws,
      losses,
      point,
      goals,
      matches,
      losts,
      owns,
      yellowCards,
      redCards,
      rank,
      voteChampions,
      voteFairPlays,
    });
    console.log('Vao day nghe cu');

    const res = await Team.findById(team);
    try {
      const statisticalTeam = await newTeam.save();
      res.statistical = new ObjectId(statisticalTeam._id);
      await res.save();
      return statisticalTeam;
    } catch (e) {
      console.log(e);
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateStatisticalTeam(teamData: IStatisticalTeam, id: string): Promise<IStatisticalTeam> {
    const {
      team,
      wins,
      draws,
      losses,
      point,
      goals,
      losts,
      owns,
      yellowCards,
      redCards,
      rank,
      voteChampions,
      voteFairPlays,
    } = teamData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No statisticalTeam with id: ${id}`);
    }

    const newTeam = new StatisticalTeam({
      team,
      wins,
      draws,
      losses,
      point,
      goals,
      losts,
      owns,
      yellowCards,
      redCards,
      rank,
      voteChampions,
      voteFairPlays,
    });
    try {
      const updateTeam = await StatisticalTeam.findByIdAndUpdate(id, newTeam, {
        new: true,
      });
      return updateTeam!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteStatisticalTeam(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No StatisticalTeam with id: ${id}`);
    }

    try {
      await StatisticalTeam.findByIdAndRemove(id);
      return 'StatisticalTeam deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
