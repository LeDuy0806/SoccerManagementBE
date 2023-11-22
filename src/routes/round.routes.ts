import { Router } from 'express';
import { Routes } from '@/interfaces';
import { RoundController } from '@/controllers/round.controller';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';

class RoundRoute implements Routes {
    public router = Router();
    public round = new RoundController();
    public path = PATHS.ROUND;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/stage', wrapRequestHandler(this.round.getRoundStage));
    }
}

export default RoundRoute;
