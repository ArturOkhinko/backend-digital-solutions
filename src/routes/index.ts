import { Router } from 'express';
import itemsRoute from './items.route';

const router = Router();

router.use(itemsRoute);

export default router;
