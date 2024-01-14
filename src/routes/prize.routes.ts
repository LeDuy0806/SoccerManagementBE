import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PrizeController } from '@/controllers/prize.controller';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';

class PrizeRoute implements Routes {
  public router = Router();
  public prize = new PrizeController();
  public path = PATHS.PRIZE;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/prize':
     *  get:
     *     tags:
     *     - Prize
     *     summary: Get all prizes
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
    this.router.get('/', wrapRequestHandler(this.prize.getPrizes));
  }
}

export default PrizeRoute;
