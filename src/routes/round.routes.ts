import { Router } from 'express';
import { Routes } from '@/interfaces';
import { RoundController } from '@/controllers/round.controller';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';

class RoundRoute implements Routes {
  public router = Router();
  public round = new RoundController();
  public path = PATHS.ROUND;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/round':
     *  get:
     *     tags:
     *     - Round
     *     summary: Get all rounds
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
    this.router.get('/', wrapRequestHandler(this.round.getRounds));

    /**
     * @openapi
     * '/round/tags/:tags':
     *  get:
     *     tags:
     *     - Round
     *     summary: Get all rounds by tags
     *     parameters:
     *      - in: path
     *        name: tags
     *        schema:
     *          type: string
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not found
     *      500:
     *        description: Internal server error
     *
     */
    this.router.get('/tags/:tags', wrapRequestHandler(this.round.getRoundsByTags));

    /**
     * @openapi
     * '/round/stage':
     *  get:
     *     tags:
     *     - Round
     *     summary: Get round stage
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
    this.router.get('/stage', wrapRequestHandler(this.round.getRoundStage));
  }
}

export default RoundRoute;
