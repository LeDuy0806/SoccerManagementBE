import { Tournament } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { ITournament } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class TournamentService {
    public async getTournaments(): Promise<ITournament[]> {
        try {
            const tournaments = await Tournament.find();
            if (!tournaments) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `tournaments not found`,
                );
            }
            return tournaments;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async getTournament(id: string): Promise<ITournament> {
        try {
            const tournament = await Tournament.findById(id);
            if (!tournament) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `tournament not found`,
                );
            }
            return tournament;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async createTournament(
        tournamentData: ITournament,
    ): Promise<ITournament> {
        const {
            formula,
            name,
            awardPlayers,
            awardTeams,
            prizes,
            status,
            sponsor,
            rounds,
            year,
        } = tournamentData;
        const existsTournamentName = await Tournament.findOne({
            name: tournamentData.name,
        });
        if (existsTournamentName) {
            throw new HttpException(
                HTTP_STATUS.UNPROCESSABLE_ENTITY,
                `Name already exists`,
            );
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
            year,
        });
        try {
            const tournament = await newTournament.save();
            return tournament;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async updateTournament(
        tournamentData: ITournament,
        id: string,
    ): Promise<ITournament> {
        const {
            formula,
            name,
            awardPlayers,
            awardTeams,
            prizes,
            status,
            sponsor,
            rounds,
            year,
        } = tournamentData;

        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No tournament with id: ${id}`,
            );
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
            year,
        });
        try {
            const updateTournament = await Tournament.findByIdAndUpdate(
                id,
                newTournament,
                {
                    new: true,
                },
            );
            return updateTournament!;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async deleteTournament(id: string): Promise<string> {
        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No tournament with id: ${id}`,
            );
        }

        try {
            await Tournament.findByIdAndRemove(id);
            return 'Tournament deleted successfully!';
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }
}
