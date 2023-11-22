import { ObjectId } from 'mongodb';

export interface IAwardPlayer {
    _id?: ObjectId;
    name: ENameAwardPlayer;
    object: ObjectId;
}

export enum ENameAwardPlayer {
    BESTPlAYER = 'BESTPlAYER',
    GOALPLAYER = 'GOALPLAYER',
    STRIKER = 'STRIKER',
    MIDFIELDER = 'MIDFIELDER',
    DEFENDER = 'DEFENDER',
    GOALKEEPER = 'GOALKEEPER',
}
