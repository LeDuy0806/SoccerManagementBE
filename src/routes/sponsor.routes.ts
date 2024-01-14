import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { SponsorController } from '@/controllers';

class StadiumRoute implements Routes {
  public router = Router();
  public sponsor = new SponsorController();
  public path = PATHS.SPONSOR;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/sponsor':
     *  get:
     *     tags:
     *     - Sponsor
     *     summary: Get all sponsors
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
    this.router.get('/', wrapRequestHandler(this.sponsor.getSponsors));

    /**
     * @openapi
     * '/sponsor/{id}':
     *  get:
     *     tags:
     *     - Sponsor
     *     summary: Get sponsor by id
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
    this.router.get('/:id', wrapRequestHandler(this.sponsor.getSponsor));
  }
}

export default StadiumRoute;
