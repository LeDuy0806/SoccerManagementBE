import HTTP_STATUS from '@/constants/httpStatus';
import { HttpException } from '@/exceptions/httpException';
import { IUser } from '@/interfaces';
import { User } from '@/models/schema';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class UserRepository {
  public async getUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      if (!users) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `users not found`);
      }
      return users;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async getUser(id: string): Promise<IUser> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `user not found`);
      }
      return user;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async createUser(userData: IUser): Promise<IUser> {
    const { username, email, dob, avatar } = userData;
    const existsEmailName = await User.findOne({
      name: userData.email,
    });
    if (existsEmailName) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, `User already exists`);
    }
    const newUser = new User({
      username,
      email,
      dob,
      avatar,
    });
    try {
      const user = await newUser.save();
      return user;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async updateUser(userData: IUser, id: string): Promise<IUser> {
    const { username, email, dob, avatar } = userData;

    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No User with id: ${id}`);
    }

    const newUser = new User({
      username,
      email,
      dob,
      avatar,
    });
    try {
      const updateUser = await User.findByIdAndUpdate(id, newUser, {
        new: true,
      });
      return updateUser!;
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }

  public async deleteUser(id: string): Promise<string> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, `No user with id: ${id}`);
    }

    try {
      await User.findByIdAndRemove(id);
      return 'User deleted successfully!';
    } catch {
      throw new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, `Server error`);
    }
  }
}
