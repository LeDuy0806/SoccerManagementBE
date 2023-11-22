import { Router } from 'express';
import { PATHS } from '../constants/paths';
const route = Router();

import AuthRoute from './auth.routes';
import PrizeRoute from './prize.routes';
import StadiumRoute from './stadium.routes';
import RefereeRoute from './referee.routes';
import RoundRoute from './round.routes';
import TableRoute from './table.routes';

route.use(PATHS.AUTH, new AuthRoute().router);
route.use(PATHS.PRIZE, new PrizeRoute().router);
route.use(PATHS.STADIUM, new StadiumRoute().router);
route.use(PATHS.REFEREE, new RefereeRoute().router);
route.use(PATHS.ROUND, new RoundRoute().router);
route.use(PATHS.TABLE, new TableRoute().router);

export default route;
