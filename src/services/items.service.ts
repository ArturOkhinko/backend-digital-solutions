import { itemsDatabase, Item } from '../database/itemsDatabase';
import { selectionStore } from '../database/SelectionStore';
import { ConflictError } from '../errors';
import {
  CreateItemInput,
  CreateItemsInput,
  GetItemsQuery,
  GetItemsResponse,
} from '../schemas/items.schema';

export const getItems = (query: GetItemsQuery): GetItemsResponse => {
  const { lastId, limit, search } = query;
  const items = itemsDatabase.collectAfter(
    lastId,
    limit,
    (item) => !selectionStore.has(item.id) && (!search || String(item.id).includes(search)),
  );
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

export const createItems = (input: CreateItemsInput): number => {
  let created = 0;
  input.ids.forEach((id) => {
    if (!itemsDatabase.has(id)) {
      itemsDatabase.insert({ id });
      created += 1;
    }
  });
  return created;
};
