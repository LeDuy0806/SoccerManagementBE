import { ObjectId } from 'mongodb';

export interface IStadium {
  _id?: ObjectId;
  name: string;
  avatar: string;
  location: string;
  capacity: string;
  coordinate: string;
}
