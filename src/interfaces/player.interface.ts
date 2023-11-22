import { ObjectId } from 'mongodb';
import { IStatisticalPLayer } from './statisticalPlayer.interface';

export interface IPlayer {
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
    ownerClub?: string;
    statisticalPlayer: IStatisticalPLayer;
}
