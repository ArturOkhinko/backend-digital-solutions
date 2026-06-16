import { Router } from 'express';
import getUsersRoute from './getUsers.route';
import itemsRoute from './items.route';

const router = Router();

router.use(getUsersRoute);
router.use(itemsRoute);

export default router;
