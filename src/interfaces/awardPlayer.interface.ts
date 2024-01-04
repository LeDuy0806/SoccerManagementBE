import { ObjectId } from 'mongodb';

export interface IAwardPlayer {
  _id?: ObjectId;
  name: ENameAwardPlayer;
  player: ObjectId;
}

export enum ENameAwardPlayer {
  BESTPlAYER = 'BESTPlAYER',
  GOALSCORER = 'GOALSCORER',
  STRIKER = 'STRIKER',
  MIDFIELDER = 'MIDFIELDER',
  DEFENDER = 'DEFENDER',
  GOALKEEPER = 'GOALKEEPER',
}
