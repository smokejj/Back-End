import { PokemonController } from "../controllers/pokemonController";
import { Router } from "express";
const router: Router = Router();
const controller = new PokemonController();

router.get('/pokemon', controller.list);
router.post('/pokemon', controller.create);
router.delete('/pokemon/:id', controller.delete);
router.get('/pokemon/:name', controller.show);
router.put('/pokemon/:id', controller.update);

export default router;