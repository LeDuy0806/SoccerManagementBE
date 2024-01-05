import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PrizeController } from '@/controllers/prize.controller';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';

class PrizeRoute implements Routes {
    public router = Router();
    public prize = new PrizeController();
    public path = PATHS.PRIZE;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', wrapRequestHandler(this.prize.getPrizes));
    }
}

export default PrizeRoute;
