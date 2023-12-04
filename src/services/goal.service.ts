import { Goal } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IGoal } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class GoalService {
    public async getGoals(): Promise<IGoal[]> {
        try {
            const goal = await Goal.find();
            if (!goal) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `goal not found`,
                );
            }
            return goal;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async getGoal(id: string): Promise<IGoal> {
        try {
            const goal = await Goal.findById(id);
            if (!goal) {
                throw new HttpException(
                    HTTP_STATUS.NOT_FOUND,
                    `goal not found`,
                );
            }
            return goal;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async createGoal(goalData: IGoal): Promise<IGoal> {
        const { player, match, number, time } = goalData;
        // const existsGoalName = await Goal.findOne({
        //     name: GoalData.name,
        // });
        // if (existsGoalName) {
        //     throw new HttpException(
        //         HTTP_STATUS.UNPROCESSABLE_ENTITY,
        //         `Goal already exists`,
        //     );
        // }
        const newGoal = new Goal({
            player,
            match,
            number,
            time,
        });
        try {
            const Goal = await newGoal.save();
            return Goal;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async updateGoal(goalData: IGoal, id: string): Promise<IGoal> {
        const { player, match, number, time } = goalData;

        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Goal with id: ${id}`,
            );
        }

        const newGoal = new Goal({
            player,
            match,
            number,
            time,
        });
        try {
            const updateGoal = await Goal.findByIdAndUpdate(id, newGoal, {
                new: true,
            });
            return updateGoal!;
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }

    public async deleteGoal(id: string): Promise<string> {
        if (!ObjectId.isValid(id)) {
            throw new HttpException(
                HTTP_STATUS.NOT_FOUND,
                `No Goal with id: ${id}`,
            );
        }

        try {
            await Goal.findByIdAndRemove(id);
            return 'goal deleted successfully!';
        } catch {
            throw new HttpException(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                `Server error`,
            );
        }
    }
}
