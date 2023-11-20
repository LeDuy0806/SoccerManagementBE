import { ObjectId } from 'mongodb';

export interface IPLayer {
    _id?: ObjectId;
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
    numberOfGoal: ObjectId[];
    numberOfOwnGoal: ObjectId[];
    yellowCard: ObjectId[];
    redCard: ObjectId[];
    voteBestPlayer: ObjectId[];
    voteBestPosition: ObjectId[];
}
