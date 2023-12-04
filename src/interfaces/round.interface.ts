import { ObjectId } from 'mongodb';
import { ITable } from './table.interface';

export interface IRound {
    _id?: ObjectId;
    type: string;
    numberOfTeam: number;
    tables?: ITable[];
    status: string;
    tags: string;
    matches?: ObjectId[];
}
