import { Router } from 'express';
import * as itemsController from '../controllers/items.controller';
import { validate } from '../middleware/validate';
import { createItemSchema, createItemsSchema, getItemsQuerySchema } from '../schemas/items.schema';

const router = Router();

router.get('/items', validate(getItemsQuerySchema, 'query'), itemsController.getItems);
router.post('/items', validate(createItemSchema, 'body'), itemsController.createItem);
router.post('/items/batch', validate(createItemsSchema, 'body'), itemsController.createItems);

export default router;
