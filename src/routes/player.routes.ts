import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { PlayerController } from '@/controllers';

class PlayerRoute implements Routes {
  public router = Router();
  public player = new PlayerController();
  public path = PATHS.PLAYER;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/player':
     *  get:
     *     tags:
     *     - Player
     *     summary: Get all players
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
    this.router.get('/', wrapRequestHandler(this.player.getPlayers));

    /**
     * @openapi
     * '/player/tags/{tags}':
     *  get:
     *     tags:
     *     - Player
     *     summary: Get all players by tags
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
    this.router.get('/tags/:tags', wrapRequestHandler(this.player.getPlayersByTags));

    /**
     * @openapi
     * '/player/tags/{tags}/position/{position}':
     *  get:
     *     tags:
     *     - Player
     *     summary: Get all players by tags and position
     *     parameters:
     *      - name: tags
     *        in: path
     *        schema:
     *          type: string
     *        required: true
     *      - name: position
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
    this.router.get('/tags/:tags/position/:position', wrapRequestHandler(this.player.getPlayersByTagsAndPosition));

    /**
     * @openapi
     * '/player':
     *  post:
     *     tags:
     *     - Player
     *     summary: Create a new player
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              type: object
     *              properties:
     *                players:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/schemas/CreatePlayerDto'
     *                idTeam:
     *                  type: string
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
    this.router.post('/', wrapRequestHandler(this.player.createPlayer));

    /**
     * @openapi
     * '/player/{id}/team/{idTeam}':
     *  delete:
     *     tags:
     *     - Player
     *     summary: Delete player by owner
     *     parameters:
     *      - name: id
     *        in: path
     *        schema:
     *          type: string
     *        required: true
     *      - name: idTeam
     *        in: path
     *        schema:
     *          type: string
     *        required: true
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
    this.router.delete('/:id/team/:idTeam', wrapRequestHandler(this.player.deletePlayerByOwner));
  }
}

export default PlayerRoute;
