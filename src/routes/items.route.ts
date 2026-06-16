import { Router } from 'express';
import * as itemsController from '../controllers/items.controller';

const router = Router();

router.get('/items', itemsController.getItems);

export default router;
