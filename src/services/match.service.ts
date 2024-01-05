import { Match } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IMatch } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class MatchService {
    public async getMatches(): Promise<IMatch[]> {
        try {
            const matches = await Match.find();
            if (!matches) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `matches not found`,
                );
            }
            return matches;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async getMatch(id: string): Promise<IMatch> {
        try {
            const match = await Match.findById(id);
            if (!match) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `match not found`,
                );
            }
            return match;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async createMatch(MatchData: IMatch): Promise<IMatch> {
        const {
            teamOne,
            teamTwo,
            pointOfTeamOne,
            pointOfTeamTwo,
            cardsTeamOne,
            cardsTeamTwo,
            goalsTeamOne,
            goalsTeamTwo,
            mainReferee,
            subReferee,
            time,
            status,
            stadium,
        } = MatchData;
        const existsMatchName = await Match.findOne({
            name: MatchData.time,
        });
        if (existsMatchName) {
            throw new HttpException(
                HTTP_STATUS.UNPROCESSABLE_ENTITY,
                `Match already exists`,
            );
        }
        const newMatch = new Match({
            teamOne,
            teamTwo,
            pointOfTeamOne,
            pointOfTeamTwo,
            cardsTeamOne,
            cardsTeamTwo,
            goalsTeamOne,
            goalsTeamTwo,
            mainReferee,
            subReferee,
            time,
            status,
            stadium,
        });
        try {
            const match = await newMatch.save();
            return match;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async updateMatch(matchData: IMatch, id: string): Promise<IMatch> {
        const {
            teamOne,
            teamTwo,
            pointOfTeamOne,
            pointOfTeamTwo,
            cardsTeamOne,
            cardsTeamTwo,
            goalsTeamOne,
            goalsTeamTwo,
            mainReferee,
            subReferee,
            time,
            status,
            stadium,
        } = matchData;

        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Match with id: ${id}`,
            );
        }

        const newMatch = new Match({
            teamOne,
            teamTwo,
            pointOfTeamOne,
            pointOfTeamTwo,
            cardsTeamOne,
            cardsTeamTwo,
            goalsTeamOne,
            goalsTeamTwo,
            mainReferee,
            subReferee,
            time,
            status,
            stadium,
        });
        try {
            const updateMatch = await Match.findByIdAndUpdate(id, newMatch, {
                new: true,
            });
            return updateMatch!;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async deleteMatch(id: string): Promise<string> {
        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Match with id: ${id}`,
            );
        }

        try {
            await Match.findByIdAndRemove(id);
            return 'Match deleted successfully!';
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }
}
