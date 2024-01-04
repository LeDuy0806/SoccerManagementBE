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
    this.router.get('/', wrapRequestHandler(this.table.getTables));
    this.router.get('/tags/:tags', wrapRequestHandler(this.table.getTableByTags));
  }
}

export default TableRoute;
