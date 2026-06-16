import { selectionStore } from '../src/database/SelectionStore';
import { seedItems } from '../src/database/itemsDatabase';
import {
  addToSelection,
  getSelected,
  removeFromSelection,
  reorderSelected,
} from '../src/services/selected.service';
import { getItems } from '../src/services/items.service';
import { NotFoundError } from '../src/errors';

describe('selection', () => {
  beforeAll(() => {
    seedItems();
  });

  beforeEach(() => {
    selectionStore.clear();
  });

  it('adds existing items to the selection and ignores duplicates', () => {
    expect(addToSelection({ ids: [3, 1, 2] })).toBe(3);
    expect(addToSelection({ ids: [1] })).toBe(0);
    expect(selectionStore.size()).toBe(3);
  });

  it('ignores ids that do not exist in the database', () => {
    expect(addToSelection({ ids: ['missing-id'] })).toBe(0);
  });

  it('keeps insertion order and paginates by cursor', () => {
    addToSelection({ ids: [5, 1, 9] });
    const first = getSelected({ limit: 2 });
    expect(first.items).toEqual([{ id: 5 }, { id: 1 }]);
    expect(first.lastId).toBe(1);

    const second = getSelected({ lastId: 1, limit: 2 });
    expect(second.items).toEqual([{ id: 9 }]);
  });

  it('filters selected by id substring', () => {
    addToSelection({ ids: [11, 2, 13] });
    const result = getSelected({ limit: 20, search: '1' });
    expect(result.items).toEqual([{ id: 11 }, { id: 13 }]);
  });

  it('reorders by anchor and rejects unknown ids', () => {
    addToSelection({ ids: [1, 2, 3] });
    reorderSelected({ id: 1, afterId: 3 });
    expect(getSelected({ limit: 20 }).items).toEqual([{ id: 2 }, { id: 3 }, { id: 1 }]);

    reorderSelected({ id: 3, afterId: null });
    expect(getSelected({ limit: 20 }).items).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }]);

    expect(() => reorderSelected({ id: 999999999, afterId: null })).toThrow(NotFoundError);
  });

  it('removes from the selection', () => {
    addToSelection({ ids: [1, 2, 3] });
    expect(removeFromSelection({ ids: [2] })).toBe(1);
    expect(getSelected({ limit: 20 }).items).toEqual([{ id: 1 }, { id: 3 }]);
  });

  it('excludes selected items from the available list', () => {
    addToSelection({ ids: [1, 2, 3] });
    const available = getItems({ limit: 3 });
    expect(available.items).toEqual([{ id: 4 }, { id: 5 }, { id: 6 }]);
  });
});
