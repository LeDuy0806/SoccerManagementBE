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
    this.router.get('/', wrapRequestHandler(this.statisticalTournament.getStatisticalTournaments));
    this.router.get('/:id', wrapRequestHandler(this.statisticalTournament.getStatisticalTournament));
  }
}

export default StatisticalTournamentRoute;
