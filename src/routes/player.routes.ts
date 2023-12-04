import { Router } from 'express';
import { Routes } from '@/interfaces';
import { PATHS } from '@/constants/paths';
import { wrapRequestHandler } from '@/utils/handles';
import { PlayerController } from '@/controllers';

class PlayerRoute implements Routes {
    public router = Router();
    public player = new PlayerController();
    public path = PATHS.PLAYER;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', wrapRequestHandler(this.player.getPlayers));
        this.router.get(
            '/tags/:tags',
            wrapRequestHandler(this.player.getPlayersByTags),
        );
        this.router.get(
            '/tags/:tags/position/:position',
            wrapRequestHandler(this.player.getPlayersByTagsAndPosition),
        );
    }
}

export default PlayerRoute;
