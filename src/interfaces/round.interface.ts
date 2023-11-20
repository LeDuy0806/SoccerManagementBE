import { ObjectId } from 'mongodb';

export interface IRound {
    _id?: ObjectId;
    type: string;
    match?: ObjectId[];
    table?: TABLE[];
    numberOfTeam: number;
    status: string;
}

interface TABLE {
    name: string;
    teams: ObjectId[];
    match: ObjectId[];
}
