import { ObjectId } from 'mongodb';

export interface ISponsor {
  _id?: ObjectId;
  name: string;
  image: string;
  logo: string;
  email: string;
}
