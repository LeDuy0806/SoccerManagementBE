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
    this.router.get('/', wrapRequestHandler(this.tournament.getTournaments));
    this.router.post('/format', wrapRequestHandler(this.tournament.getTournamentsFormat));
  }
}

export default TournamentRoute;
