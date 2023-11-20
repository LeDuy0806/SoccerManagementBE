import { ObjectId } from 'mongodb';

export interface ILeaderBoard {
    _id?: ObjectId;
    leaderBoard: ObjectId[];
    statisticPlayer: ObjectId[];
    statisticTeam: ObjectId[];
    tournament: ObjectId;
}
