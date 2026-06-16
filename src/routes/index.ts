import { Router } from 'express';
import getUsersRoute from './getUsers.route';

const router = Router();

router.use(getUsersRoute);

export default router;
