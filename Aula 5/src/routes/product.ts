import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const routers: Router = Router();
const controller = new ProductController();

routers.get('/products', controller.list);
routers.post('/products', controller.create);
routers.get('/products/:id', controller.show);
routers.get('/products/:name', controller.shew);
routers.put('/products/:id', controller.update);
routers.delete('/products/:id', controller.delete);

export default routers;