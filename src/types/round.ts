import { Match } from "./match";
import { Team } from "./team";

export interface Round {
    _id?: string;
    type: string;
    match?: Match[];
    table?: TABLE[];
    numberOfTeam: number;
    status: string;
}

interface TABLE {
    name: string;
    teams: Team[];
    match: Match[];
}
