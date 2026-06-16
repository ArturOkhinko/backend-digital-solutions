import { Request, Response, NextFunction } from 'express';
import { CreateItemInput, GetItemsQuery } from '../schemas/items.schema';
import * as itemsService from '../services/items.service';

export const getItems = (req: Request, res: Response): void => {
  const query = req.query as unknown as GetItemsQuery;
  const result = itemsService.getItems(query);
  res.status(200).json(result);
};

export const createItem = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const input = req.body as CreateItemInput;
    const item = itemsService.createItem(input);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
