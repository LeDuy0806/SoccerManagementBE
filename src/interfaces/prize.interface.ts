import { ObjectId } from 'mongodb';

export interface IPrize {
<<<<<<< HEAD
    _id?: ObjectId;
    category: string;
    status: ETypeStatusPrize;
    completion: string;
    bonus: string;
    image: string;
}

export enum ETypeStatusPrize {
    HAPPING = 'HAPPING',
    FINISHED = 'FINISHED',
=======
  _id?: ObjectId;
  category: string;
  status: ETypeStatusPrize;
  completion: string;
  bonus: string;
  image: string;
}

export enum ETypeStatusPrize {
  HAPPING = 'HAPPING',
  FINISHED = 'FINISHED',
>>>>>>> 3285275a57ef4344d443c88729cc7d2e8e89941f
}
