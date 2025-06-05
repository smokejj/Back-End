import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router: Router = Router();
const controller = new UserController();

router.get('/users', controller.list);
router.post('/users', controller.create);
router.get('/users/:id', controller.show);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.delete);

export default router;