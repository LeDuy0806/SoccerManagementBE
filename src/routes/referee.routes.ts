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
    /**
     * @openapi
     * '/referee':
     *  get:
     *     tags:
     *     - Referee
     *     summary: Get all referees
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not found
     *      500:
     *        description: Internal server error
     */
    this.router.get('/', wrapRequestHandler(this.referees.getReferees));
  }
}

export default RefereeRoute;
