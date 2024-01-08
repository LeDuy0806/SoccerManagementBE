import { ObjectId } from 'mongodb';

export interface IAwardPlayer {
<<<<<<< HEAD
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
=======
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
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
