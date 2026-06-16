import { Request, Response, NextFunction } from 'express';
import { getUsersQuerySchema } from '../schemas/getUsers.schema';
import * as getUsersService from '../services/getUsers.service';

/**
 * Controller for GET /api/users.
 * Validates the query with Zod, then delegates to the service layer.
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = getUsersQuerySchema.parse(req.query);
    const result = await getUsersService.getUsers(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
