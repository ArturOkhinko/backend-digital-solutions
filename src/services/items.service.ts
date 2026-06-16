import { itemsDatabase, Item } from '../database/itemsDatabase';
import { ConflictError } from '../errors';
import { CreateItemInput, GetItemsQuery, GetItemsResponse } from '../schemas/items.schema';

export const getItems = (query: GetItemsQuery): GetItemsResponse => {
  const { lastId, limit, search } = query;
  const items = search
    ? itemsDatabase.search(lastId, limit, search)
    : itemsDatabase.getAfter(lastId, limit);
  const nextLastId = items.length > 0 ? items[items.length - 1].id : null;

  return { items, lastId: nextLastId };
};

export const createItem = (input: CreateItemInput): Item => {
  const { id } = input;
  if (itemsDatabase.has(id)) {
    throw new ConflictError(`Item with id ${String(id)} already exists`);
  }
  const item: Item = { id };
  itemsDatabase.insert(item);
  return item;
};
