
import { Coach } from "./coach";
import { Match } from "./match";
import { Player } from "./player";
import { User } from "./user";

export interface Team {
    _id?: string;
    name: string;
    flag: string;
    coach: Coach;
    players: Player[];
    matches: Match[];
    voteChampion: User[];
    voteFairPlay: User[];
}
