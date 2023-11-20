import { ObjectId } from 'mongodb';

export interface ITeam {
    _id?: ObjectId;
    name: string;
    flag: string;
    coach: ObjectId;
    players: ObjectId[];
    matches: ObjectId[];
    voteChampion: ObjectId[];
    voteFairPlay: ObjectId[];
}
