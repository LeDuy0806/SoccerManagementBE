import { ObjectId } from 'mongodb';

export interface ITeam {
  _id?: ObjectId;
  name: string;
  representative: ObjectId;
  level: string;
  area: string;
  uniform: string[];
  isPublic: string | boolean;
  flag: string;
  rank?: string;
  coach: ObjectId;
  players: ObjectId[];
  stadium?: ObjectId;
  matches: ObjectId[];
  statistical: ObjectId;
  tags: string;
}
