import { Request, Response, NextFunction } from 'express';
import { GetItemsQuery } from '../schemas/items.schema';
import { ReorderSelectedInput, SelectIdsInput } from '../schemas/selected.schema';
import * as selectedService from '../services/selected.service';

export const getSelected = (req: Request, res: Response): void => {
  const query = req.query as unknown as GetItemsQuery;
  res.status(200).json(selectedService.getSelected(query));
};

export const addSelected = (req: Request, res: Response): void => {
  const added = selectedService.addToSelection(req.body as SelectIdsInput);
  res.status(200).json({ added });
};

export const removeSelected = (req: Request, res: Response): void => {
  const removed = selectedService.removeFromSelection(req.body as SelectIdsInput);
  res.status(200).json({ removed });
};

export const reorderSelected = (req: Request, res: Response, next: NextFunction): void => {
  try {
    selectedService.reorderSelected(req.body as ReorderSelectedInput);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
