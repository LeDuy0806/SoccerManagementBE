import { Router } from 'express';
import { Routes } from '@/interfaces';
import { StadiumController } from '@/controllers/stadium.controller';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';

class StadiumRoute implements Routes {
  public router = Router();
  public stadium = new StadiumController();
  public path = PATHS.STADIUM;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/stadium':
     *  get:
     *     tags:
     *     - Stadium
     *     summary: Get all stadiums
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
    this.router.get('/', wrapRequestHandler(this.stadium.getStadiums));
  }
}

export default StadiumRoute;
