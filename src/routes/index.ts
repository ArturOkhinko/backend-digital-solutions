import { Router } from 'express';
import itemsRoute from './items.route';
import selectedRoute from './selected.route';

const router = Router();

router.use(itemsRoute);
router.use(selectedRoute);

export default router;
