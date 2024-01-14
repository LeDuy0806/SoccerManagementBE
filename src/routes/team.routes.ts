import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { TeamController } from '@/controllers';

class TeamRoute implements Routes {
  public router = Router();
  public team = new TeamController();
  public path = PATHS.TEAM;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/team':
     *  get:
     *     tags:
     *     - Team
     *     summary: Get all teams
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
    this.router.get('/', wrapRequestHandler(this.team.getTeams));

    /**
     * @openapi
     * '/team/{id}':
     *  get:
     *     tags:
     *     - Team
     *     summary: Get team by id
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
    this.router.get('/:id', wrapRequestHandler(this.team.getTeam));

    /**
     * @openapi
     * '/team/tags/{tags}':
     *  get:
     *     tags:
     *     - Team
     *     summary: Get all teams by tags
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
     */
    this.router.get('/tags/:tags', wrapRequestHandler(this.team.getTeamsByTags));

    /**
     * @openapi
     * '/team':
     *  post:
     *     tags:
     *     - Team
     *     summary: Create a new team
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateTeamDto'
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
    this.router.post('/', wrapRequestHandler(this.team.createTeam));
  }
}

export default TeamRoute;
