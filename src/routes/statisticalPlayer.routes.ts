import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { StatisticalPlayerController } from '@/controllers';

class StatisticalPlayerRoute implements Routes {
  public router = Router();
  public statisticalPlayer = new StatisticalPlayerController();
  public path = PATHS.STATISTICALPLAYER;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/statisticalPlayer':
     *  get:
     *     tags:
     *     - Statistical Player
     *     summary: Get all statistical players
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
    this.router.get('/', wrapRequestHandler(this.statisticalPlayer.getStatisticalPlayers));

    /**
     * @openapi
     * '/statisticalPlayer/tags/:tags':
     *  get:
     *     tags:
     *     - Statistical Player
     *     summary: Get all statistical players by tags
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
    this.router.get('/tags/:tags', wrapRequestHandler(this.statisticalPlayer.getStatisticalTeamsByTags));

    /**
     * @openapi
     * '/statisticalPlayer':
     *  post:
     *     tags:
     *     - Statistical Player
     *     summary: Create a new statistical player
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: array
     *            items:
     *              $ref: '#/components/schemas/CreateStatisticalPLayerDto'
     *     responses:
     *      201:
     *        description: Created
     *      404:
     *        description: Not found
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.post('/', wrapRequestHandler(this.statisticalPlayer.createStatisticalPlayer));
  }
}

export default StatisticalPlayerRoute;
