import { Card } from "./card";
import { Goal } from "./goal";
import { Referee } from "./referee";
import { Stadium } from "./stadium";
import { Team } from "./team";

export interface Match {
    _id?: string;
    teamOne: Team;
    teamTwo: Team;
    pointOfTeamOne: number;
    pointOfTeamTwo: number;
    card: Card[];
    goal: Goal[];
    mainReferee: Referee;
    subReferee: Referee[];
    stadium: Stadium;
    round: string;
    score: string;
    isLive: boolean;
    time: Date;
}
