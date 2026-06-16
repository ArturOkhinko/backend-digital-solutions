import { itemsDatabase } from '../database/itemsDatabase';
import { GetItemsQuery, GetItemsResponse } from '../schemas/items.schema';

export const getItems = (query: GetItemsQuery): GetItemsResponse => {
  const { lastId, limit } = query;
  const items = itemsDatabase.getAfter(lastId, limit);
  const nextLastId = items.length > 0 ? items[items.length - 1].id : null;

  return { items, lastId: nextLastId };
};
