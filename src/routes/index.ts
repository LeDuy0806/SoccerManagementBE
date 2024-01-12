import { Router } from 'express';
import { PATHS } from '../constants/paths';
const route = Router();

import AuthRoute from './auth.routes';
import TournamentRoute from './tournament.routes';
import TeamRoute from './team.routes';
import StatisticalTeamRoute from './statisticalTeam.routes';
import StatisticalPlayerRoute from './statisticalPlayer.routes';
import StatisticalTournamentRoute from './statisticalTournament.routes';
import PlayerRoute from './player.routes';
import PrizeRoute from './prize.routes';
import StadiumRoute from './stadium.routes';
import RefereeRoute from './referee.routes';
import RoundRoute from './round.routes';
import TableRoute from './table.routes';

// route.use('/api/auth/sign-up', (res, req) => {
//   console.log('caaa');
// });

route.use(PATHS.AUTH, new AuthRoute().router);
route.use(PATHS.TOURNAMENT, new TournamentRoute().router);
route.use(PATHS.STATISTICALTOURNAMENT, new StatisticalTournamentRoute().router);
route.use(PATHS.TEAM, new TeamRoute().router);
route.use(PATHS.STATISTICALTEAM, new StatisticalTeamRoute().router);
route.use(PATHS.PLAYER, new PlayerRoute().router);
route.use(PATHS.STATISTICALPLAYER, new StatisticalPlayerRoute().router);
route.use(PATHS.PRIZE, new PrizeRoute().router);
route.use(PATHS.STADIUM, new StadiumRoute().router);
route.use(PATHS.REFEREE, new RefereeRoute().router);
route.use(PATHS.ROUND, new RoundRoute().router);
route.use(PATHS.TABLE, new TableRoute().router);

export default route;
