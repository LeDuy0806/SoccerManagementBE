import { Referee } from '@/models/schema';
import { Service } from 'typedi';
import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IReferee } from '@/interfaces';
import { ObjectId } from 'mongodb';

@Service()
export class RefereeRepository {
  public async getReferees(): Promise<IReferee[]> {
    try {
      const referees = await Referee.find();
      if (!referees) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `referees not found`);
      }
      return referees;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getReferee(id: string): Promise<IReferee> {
    try {
      const referee = await Referee.findById(id);
      if (!referee) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `referee not found`);
      }
      return referee;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createReferee(refereeData: IReferee): Promise<IReferee> {
    const { name, avatar, age, dob, nation, wikipedia } = refereeData;
    const existsRefereeName = await Referee.findOne({
      name: refereeData.name,
    });
    if (existsRefereeName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `Referee already exists`);
    }
    const newReferee = new Referee({
      name,
      avatar,
      age,
      dob,
      nation,
      wikipedia,
    });
    try {
      const referee = await newReferee.save();
      return referee;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateReferee(refereeData: IReferee, id: string): Promise<IReferee> {
    const { name, avatar, age, dob, nation, wikipedia } = refereeData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No Referee with id: ${id}`);
    }

    const newReferee = new Referee({
      name,
      avatar,
      age,
      dob,
      nation,
      wikipedia,
    });
    try {
      const updateReferee = await Referee.findByIdAndUpdate(id, newReferee, {
        new: true,
      });
      return updateReferee!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteReferee(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No referee with id: ${id}`);
    }

    try {
      await Referee.findByIdAndRemove(id);
      return 'referee deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
