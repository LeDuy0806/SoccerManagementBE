import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { GoalService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { IGoal } from '@/interfaces';

export class GoalController {
    public goal = Container.get(GoalService);

    public getGoals = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const goals = await this.goal.getGoals();
            res.status(HTTP_STATUS.OK).json(goals);
        } catch (error) {
            next(error);
        }
    };

    public getGoal = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const goal = await this.goal.getGoal(id);
            res.status(HTTP_STATUS.OK).json(goal);
        } catch (error) {
            next(error);
        }
    };

    public createGoal = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const goalData: IGoal = req.body;
        try {
            const goal = await this.goal.createGoal(goalData);
            res.status(HTTP_STATUS.OK).json(goal);
        } catch (error) {
            next(error);
        }
    };

    public updateGoal = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        const goalData: IGoal = req.body;
        try {
            const goal = await this.goal.updateGoal(goalData, id);
            res.status(HTTP_STATUS.OK).json(goal);
        } catch (error) {
            next(error);
        }
    };

    public deleteGoal = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { id } = req.params;
        try {
            const result = await this.goal.deleteGoal(id);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };
}
