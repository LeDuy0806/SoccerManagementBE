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
    this.router.get('/', wrapRequestHandler(this.statisticalTeam.getStatisticalTeams));
    this.router.get('/tags/:tags', wrapRequestHandler(this.statisticalTeam.getStatisticalTeamsByTags));
    this.router.post('/', wrapRequestHandler(this.statisticalTeam.createstatisticalTeam));
  }
}

export default StatisticalTeamRoute;
