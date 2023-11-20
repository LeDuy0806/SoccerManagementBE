import { Player } from "./player";

export interface Goal {
    _id?: string;
    player: Player;
    assist: Player;
    match: any;
    time: Date;
    typeOfGoal: string;
}
