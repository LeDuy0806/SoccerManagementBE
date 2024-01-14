import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { StatisticalTeamController } from '@/controllers';

class StatisticalTeamRoute implements Routes {
  public router = Router();
  public statisticalTeam = new StatisticalTeamController();
  public path = PATHS.STATISTICALTEAM;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/statisticalTeam':
     *  get:
     *     tags:
     *     - Statistical Team
     *     summary: Get all statistical teams
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
    this.router.get('/', wrapRequestHandler(this.statisticalTeam.getStatisticalTeams));

    /**
     * @openapi
     * '/statisticalTeam/tags/{tags}':
     *  get:
     *     tags:
     *     - Statistical Team
     *     summary: Get all statistical teams by tags
     *     parameters:
     *      - name: tags
     *        in: path
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
    this.router.get('/tags/:tags', wrapRequestHandler(this.statisticalTeam.getStatisticalTeamsByTags));

    /**
     * @openapi
     * '/statisticalTeam':
     *  post:
     *     tags:
     *     - Statistical Team
     *     summary: Create a new statistical team
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateStatisticalTeamDto'
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
    this.router.post('/', wrapRequestHandler(this.statisticalTeam.createstatisticalTeam));
  }
}

export default StatisticalTeamRoute;
