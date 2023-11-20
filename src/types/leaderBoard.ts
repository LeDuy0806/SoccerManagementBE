import { Player } from "./player";
import { StatisticalTeam } from "./statisticalTeam";
import { Team } from "./team";
import { Tournament } from "./tournament";

export interface LeaderBoard {
    _id?: string;
    leaderBoard: Team[];
    statisticPlayer: Player[];
    statisticTeam: StatisticalTeam[];
    tournament: Tournament;
}
