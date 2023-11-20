import { Card } from "./card";
import { Goal } from "./goal";
import { User } from "./user";

export interface Player {
    _id?: string;
    name: string;
    avatar: string;
    age: number;
    height: string;
    national: string;
    number: number;
    dob: Date;
    dateStart: Date;
    position: string;
    goals: number;
    ownerClub: string;
    numberOfGoal: Goal[];
    numberOfOwnGoal: Goal[];
    yellowCard: Card[];
    redCard: Card[];
    voteBestPlayer: User[];
    voteBestPosition: User[];
}