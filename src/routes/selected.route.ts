import { Router } from 'express';
import * as selectedController from '../controllers/selected.controller';
import { validate } from '../middleware/validate';
import { getItemsQuerySchema } from '../schemas/items.schema';
import { reorderSelectedSchema, selectIdsSchema } from '../schemas/selected.schema';

const router = Router();

router.get('/selected', validate(getItemsQuerySchema, 'query'), selectedController.getSelected);
router.post('/selected', validate(selectIdsSchema, 'body'), selectedController.addSelected);
router.delete('/selected', validate(selectIdsSchema, 'body'), selectedController.removeSelected);
router.patch(
  '/selected/reorder',
  validate(reorderSelectedSchema, 'body'),
  selectedController.reorderSelected,
);

export default router;
