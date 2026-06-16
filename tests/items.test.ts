import { InMemoryDatabase } from '../src/database/InMemoryDatabase';
import { itemsDatabase, seedItems, TOTAL_ITEMS, Item } from '../src/database/itemsDatabase';
import { createItem, getItems } from '../src/services/items.service';
import { ConflictError } from '../src/errors';

describe('InMemoryDatabase', () => {
  it('inserts and reads records by id', () => {
    const db = new InMemoryDatabase<Item>();
    db.insert({ id: 1 });
    db.insert({ id: 2 });
    expect(db.size()).toBe(2);
    expect(db.getById(2)).toEqual({ id: 2 });
    expect(db.getById(99)).toBeUndefined();
  });

  it('keeps records sorted when inserted out of order', () => {
    const db = new InMemoryDatabase<Item>();
    db.insert({ id: 5 });
    db.insert({ id: 1 });
    db.insert({ id: 3 });
    expect(db.getAfter(undefined, 10)).toEqual([{ id: 1 }, { id: 3 }, { id: 5 }]);
    expect(db.getAfter(1, 10)).toEqual([{ id: 3 }, { id: 5 }]);
  });

  it('orders numbers before string ids', () => {
    const db = new InMemoryDatabase<Item>();
    db.insert({ id: 'b' });
    db.insert({ id: 2 });
    db.insert({ id: 'a' });
    db.insert({ id: 1 });
    expect(db.getAfter(undefined, 10)).toEqual([{ id: 1 }, { id: 2 }, { id: 'a' }, { id: 'b' }]);
  });

  it('throws on duplicate id', () => {
    const db = new InMemoryDatabase<Item>();
    db.insert({ id: 1 });
    expect(() => db.insert({ id: 1 })).toThrow();
  });
});

describe('seedItems', () => {
  beforeAll(() => {
    seedItems();
  });

  it('seeds the database with TOTAL_ITEMS items', () => {
    expect(itemsDatabase.size()).toBe(TOTAL_ITEMS);
  });
});

describe('getItems service', () => {
  beforeAll(() => {
    seedItems();
  });

  it('returns the first 20 items by default', () => {
    const result = getItems({ limit: 20 });
    expect(result.items).toHaveLength(20);
    expect(result.items[0]).toEqual({ id: 1 });
    expect(result.items[19]).toEqual({ id: 20 });
    expect(result.lastId).toBe(20);
  });

  it('returns the next 20 items after the given lastId', () => {
    const result = getItems({ lastId: 20, limit: 20 });
    expect(result.items).toHaveLength(20);
    expect(result.items[0]).toEqual({ id: 21 });
    expect(result.items[19]).toEqual({ id: 40 });
    expect(result.lastId).toBe(40);
  });
});

describe('createItem service', () => {
  beforeAll(() => {
    seedItems();
  });

  it('inserts a new string id at its sorted position', () => {
    createItem({ id: 'zzz-new-id' });
    expect(itemsDatabase.has('zzz-new-id')).toBe(true);
    // string ids sort after all numeric ids
    const tail = getItems({ lastId: TOTAL_ITEMS, limit: 5 });
    expect(tail.items[0]).toEqual({ id: 'zzz-new-id' });
  });

  it('throws ConflictError for a duplicate id', () => {
    expect(() => createItem({ id: 1 })).toThrow(ConflictError);
  });
});
