import { AwardTeam } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IAwardTeam } from '@/interfaces';
import { ObjectId } from 'mongodb';
@Service()
export class AwardTeamService {
    public async getAwardTeams(): Promise<IAwardTeam[]> {
        try {
            const awardTeams = AwardTeam.find();
            if (!awardTeams) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `awardTeams not found`,
                );
            }
            return awardTeams;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async getTeam(id: string): Promise<IAwardTeam> {
        try {
            const awardTeam = await AwardTeam.findById(id);
            if (!awardTeam) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `awardTeam not found`,
                );
            }
            return awardTeam;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async createTeam(awardTeamData: IAwardTeam): Promise<IAwardTeam> {
        const { name } = awardTeamData;
        const existsTeamName = await AwardTeam.findOne({
            name: awardTeamData.name,
        });
        if (existsTeamName) {
            throw new HttpException(
                HTTP_STATUS.UNPROCESSABLE_ENTITY,
                `Team already exists`,
            );
        }
        const newTeam = new AwardTeam({
            name,
        });
        try {
            const awardTeam = await newTeam.save();
            return awardTeam;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async updateTeam(
        teamData: IAwardTeam,
        id: string,
    ): Promise<IAwardTeam> {
        const { name } = teamData;

        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Team with id: ${id}`,
            );
        }

        const newAwardTeam = new AwardTeam({
            name,
        });
        try {
            const updateTeam = await AwardTeam.findByIdAndUpdate(
                id,
                newAwardTeam,
                {
                    new: true,
                },
            );
            return updateTeam!;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async deleteTeam(id: string): Promise<string> {
        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Team with id: ${id}`,
            );
        }

        try {
            await AwardTeam.findByIdAndRemove(id);
            return 'Team deleted successfully!';
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }
}
