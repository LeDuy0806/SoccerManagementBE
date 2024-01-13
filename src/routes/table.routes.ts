import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { TableController } from '@/controllers/table.controller';

class TableRoute implements Routes {
  public router = Router();
  public table = new TableController();
  public path = PATHS.TABLE;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/table':
     *  get:
     *     tags:
     *     - Table
     *     summary: Get all tables
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
    this.router.get('/', wrapRequestHandler(this.table.getTables));

    /**
     * @openapi
     * '/table/tags/:tags':
     *  get:
     *     tags:
     *     - Table
     *     summary: Get all tables by tags
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
     */
    this.router.get('/tags/:tags', wrapRequestHandler(this.table.getTableByTags));
  }
}

export default TableRoute;
