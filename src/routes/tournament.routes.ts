import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { TournamentController } from '@/controllers';

class TournamentRoute implements Routes {
  public router = Router();
  public tournament = new TournamentController();
  public path = PATHS.TOURNAMENT;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/tournament':
     *  get:
     *     tags:
     *     - Tournament
     *     summary: Get all tournaments
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
    this.router.get('/', wrapRequestHandler(this.tournament.getTournaments));

    /**
     * @openapi
     * '/tournament/format':
     *  post:
     *     tags:
     *     - Tournament
     *     summary: Get all formatted tournaments
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              type: object
     *              properties:
     *                formula:
     *                  type: string
     *                vision:
     *                  type: string
     *                status:
     *                  type: string
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
    this.router.post('/format', wrapRequestHandler(this.tournament.getTournamentsFormat));

    /**
     * @openapi
     * '/tournament':
     *  post:
     *     tags:
     *     - Tournament
     *     summary: Create a new tournament
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateTournamentDto'
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
    this.router.post('/', wrapRequestHandler(this.tournament.createTournament));
  }
}

export default TournamentRoute;
