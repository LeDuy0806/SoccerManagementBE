import { Player } from './player';

export interface Card {
  _id?: string;
  type: TypeCard;
  player: Player;
  victim: Player;
  match: any;
  time: Date;
}

export enum TypeCard {
  YELLOW = 'YELLOW',
  RED = 'RED'
}
