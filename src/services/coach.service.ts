import { Coach } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { ICoach } from '@/interfaces';
import { ObjectId } from 'mongodb';
@Service()
export class CoachService {
  public async getCoaches(): Promise<ICoach[]> {
    try {
      const coaches = await Coach.find();
      if (!coaches) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `coaches not found`);
      }
      return coaches;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getCoach(id: string): Promise<ICoach> {
    try {
      const coach = await Coach.findById(id);
      if (!coach) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `Coach not found`);
      }
      return coach;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createCoach(coachData: ICoach): Promise<ICoach> {
    const { name, avatar, age, dob, national } = coachData;
    const existsCoachName = await Coach.findOne({
      name: coachData.name,
    });
    if (existsCoachName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Coach already exists`);
    }
    const newCoach = new Coach({
      name,
      avatar,
      age,
      dob,
      national,
    });
    try {
      const coach = await newCoach.save();
      return coach;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateCoach(coachData: ICoach, id: string): Promise<ICoach> {
    const { name, avatar, age, dob, national } = coachData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Coach with id: ${id}`);
    }

    const newCoach = new Coach({
      name,
      avatar,
      age,
      dob,
      national,
    });
    try {
      const updateCoach = await Coach.findByIdAndUpdate(id, newCoach, {
        new: true,
      });
      return updateCoach!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteCoach(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Coach with id: ${id}`);
    }

    try {
      await Coach.findByIdAndRemove(id);
      return 'coach deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
