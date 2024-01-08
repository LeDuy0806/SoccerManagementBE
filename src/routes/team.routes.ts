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
    this.router.get('/', wrapRequestHandler(this.team.getTeams));
    this.router.get('/tags/:tags', wrapRequestHandler(this.team.getTeamsByTags));
  }
}

export default TeamRoute;
