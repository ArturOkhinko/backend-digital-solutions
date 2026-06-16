import { itemsDatabase } from '../database/itemsDatabase';
import { selectionStore } from '../database/SelectionStore';
import { NotFoundError } from '../errors';
import { GetItemsQuery, GetItemsResponse } from '../schemas/items.schema';
import { ReorderSelectedInput, SelectIdsInput } from '../schemas/selected.schema';

export const getSelected = (query: GetItemsQuery): GetItemsResponse => {
  const { lastId, limit, search } = query;
  const page = selectionStore.getAfter(lastId, limit, search);
  return { items: page.ids.map((id) => ({ id })), lastId: page.lastId };
};

export const addToSelection = (input: SelectIdsInput): number => {
  let added = 0;
  input.ids.forEach((id) => {
    if (itemsDatabase.has(id) && selectionStore.add(id)) {
      added += 1;
    }
  });
  return added;
};

export const removeFromSelection = (input: SelectIdsInput): number => {
  let removed = 0;
  input.ids.forEach((id) => {
    if (selectionStore.remove(id)) {
      removed += 1;
    }
  });
  return removed;
};

export const reorderSelected = (input: ReorderSelectedInput): void => {
  const moved = selectionStore.reorder(input.id, input.afterId);
  if (!moved) {
    throw new NotFoundError('Selected item or anchor not found');
  }
};
