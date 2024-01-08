import { Router } from 'express';
import { Routes } from '@/interfaces';
import { RefereeController } from '@/controllers/referee.controller';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';

class RefereeRoute implements Routes {
  public router = Router();
  public referees = new RefereeController();
  public path = PATHS.REFEREE;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', wrapRequestHandler(this.referees.getReferees));
  }
}

export default RefereeRoute;
