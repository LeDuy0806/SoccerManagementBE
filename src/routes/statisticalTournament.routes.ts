import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { StatisticalTournamentController } from '@/controllers';

class StatisticalTournamentRoute implements Routes {
  public router = Router();
  public statisticalTournament = new StatisticalTournamentController();
  public path = PATHS.STATISTICALTOURNAMENT;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/statisticalTournament':
     *  get:
     *     tags:
     *     - Statistical Tournament
     *     summary: Get all statistical tournaments
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
    this.router.get('/', wrapRequestHandler(this.statisticalTournament.getStatisticalTournaments));

    /**
     * @openapi
     * '/statisticalTournament/{id}':
     *  get:
     *     tags:
     *     - Statistical Tournament
     *     summary: Get statistical tournament by id
     *     parameters:
     *      - name: id
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
     */
    this.router.get('/:id', wrapRequestHandler(this.statisticalTournament.getStatisticalTournament));
  }
}

export default StatisticalTournamentRoute;
