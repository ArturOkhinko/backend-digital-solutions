import { Router } from 'express';
import * as getUsersController from '../controllers/getUsers.controller';

const router = Router();

// GET /api/users?lastUserId=<id>&limit=20
router.get('/users', getUsersController.getUsers);

export default router;
