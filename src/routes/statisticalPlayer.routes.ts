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
    this.router.get('/', wrapRequestHandler(this.statisticalPlayer.getStatisticalPlayers));
    this.router.get('/tags/:tags', wrapRequestHandler(this.statisticalPlayer.getStatisticalTeamsByTags));
    this.router.post('/', wrapRequestHandler(this.statisticalPlayer.createStatisticalPlayer));
  }
}

export default StatisticalPlayerRoute;
