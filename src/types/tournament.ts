import { Award } from "./award";
import { LeaderBoard } from "./leaderBoard";
import { Prize } from "./prize";
import { Round } from "./round";

export interface Tournament {
    _id?: string;
    name: string;
    award: Award;
    prize: Prize;
    leaderBoard: LeaderBoard;
    status: string;
    sponsor: string;
    round: Round[];
    year: Date;
}
