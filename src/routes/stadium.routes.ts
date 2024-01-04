import { Router } from 'express';
import { Routes } from '@/interfaces';
import { StadiumController } from '@/controllers/stadium.controller';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';

class StadiumRoute implements Routes {
  public router = Router();
  public stadium = new StadiumController();
  public path = PATHS.PRIZE;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', wrapRequestHandler(this.stadium.getStadiums));
  }
}

export default StadiumRoute;
