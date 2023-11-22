import { Round } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IRound } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class RoundService {
    public async getRoundStage(): Promise<IRound> {
        try {
            const rounds = await Round.findOne({ type: 'Stage' })
                .populate({
                    path: 'table',
                    populate: {
                        path: 'Rounds',
                        model: 'Round',
                    },
                })
                .exec();
            if (!rounds) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `rounds not found`,
                );
            }
            return rounds;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async getRound(id: string): Promise<IRound> {
        try {
            const round = await Round.findById(id);
            if (!round) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `round not found`,
                );
            }
            return round;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async createRound(roundData: IRound): Promise<IRound> {
        const { type, name, matches, leaderBoard, numberOfTeam, tables } =
            roundData;
        const existsRoundName = await Round.findOne({
            name: roundData.name,
        });
        if (existsRoundName) {
            throw new HttpException(
                HTTP_STATUS.UNPROCESSABLE_ENTITY,
                `Round already exists`,
            );
        }
        const newRound = new Round({
            type,
            name,
            matches,
            leaderBoard,
            numberOfTeam,
            tables,
        });
        try {
            const Round = await newRound.save();
            return Round;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async updateRound(roundData: IRound, id: string): Promise<IRound> {
        const { type, name, matches, leaderBoard, numberOfTeam, tables } =
            roundData;

        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Round with id: ${id}`,
            );
        }

        const newRound = new Round({
            type,
            name,
            matches,
            leaderBoard,
            numberOfTeam,
            tables,
        });
        try {
            const updateRound = await Round.findByIdAndUpdate(id, newRound, {
                new: true,
            });
            return updateRound!;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async deleteRound(id: string): Promise<string> {
        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No round with id: ${id}`,
            );
        }

        try {
            await Round.findByIdAndRemove(id);
            return 'round deleted successfully!';
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }
}
