import { Player } from "./player";

export interface Award {
    _id?: string;
    champion: Player;
    fairFlay: Player;
    best: Player;
    goal: Player;
    striker: Player;
    midfielder: Player;
    defender: Player;
    goalkeeper: Player;
}
