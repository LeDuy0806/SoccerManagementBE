import { Team } from "./team";

export interface StatisticalTeam {
    _id?: string;
    team: Team;
    wins: number;
    draws: number;
    losses: number;
    point: number;
    numberOfGoal: number;
    numberOfLost: number;
    numberOfOwnGoal: number;
    yellowCard: number;
    yellowRed: number;
    rank: number;
}