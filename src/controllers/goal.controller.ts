import HTTP_STATUS from '@/constants/httpStatus';
import Container from 'typedi';
import { GoalRepository } from '@/repositories';
import { NextFunction, Request, Response } from 'express';
import { IGoal } from '@/interfaces';
import { ResponseDto } from '@/dtos/http.dto';

export class GoalController {
  public goal = Container.get(GoalRepository);

  public getGoals = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    try {
      const goals = await this.goal.getGoals();
      res.status(HTTP_STATUS.OK).json({ data: goals, status: HTTP_STATUS.OK, message: 'get goals successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getGoal = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const goal = await this.goal.getGoal(id);
      res.status(HTTP_STATUS.OK).json({ data: goal, status: HTTP_STATUS.OK, message: 'get goal successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createGoal = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const goalData: IGoal = req.body;
    try {
      const goal = await this.goal.createGoal(goalData);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ data: goal, status: HTTP_STATUS.CREATED, message: 'get goal successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateGoal = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    const goalData: IGoal = req.body;
    try {
      const goal = await this.goal.updateGoal(goalData, id);
      res.status(HTTP_STATUS.OK).json({ data: goal, status: HTTP_STATUS.OK, message: 'delete goal successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGoal = async (req: Request, res: Response<ResponseDto>, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.goal.deleteGoal(id);
      res.status(HTTP_STATUS.OK).json({ data: result, status: HTTP_STATUS.OK, message: 'delele goal successfully' });
    } catch (error) {
      next(error);
    }
  };
}
