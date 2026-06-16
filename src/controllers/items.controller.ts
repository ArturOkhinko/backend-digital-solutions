import { Request, Response, NextFunction } from 'express';
import { getItemsQuerySchema } from '../schemas/items.schema';
import * as itemsService from '../services/items.service';

export const getItems = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const query = getItemsQuerySchema.parse(req.query);
    const result = itemsService.getItems(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
