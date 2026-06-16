import { InMemoryDatabase } from '../src/database/InMemoryDatabase';
import { itemsDatabase, seedItems, TOTAL_ITEMS, Item } from '../src/database/itemsDatabase';
import { getItems } from '../src/services/items.service';

describe('InMemoryDatabase', () => {
  it('inserts and reads records by id', () => {
    const db = new InMemoryDatabase<Item>();
    db.insert({ id: 1 });
    db.insert({ id: 2 });
    expect(db.size()).toBe(2);
    expect(db.getById(2)).toEqual({ id: 2 });
    expect(db.getById(99)).toBeUndefined();
  });

  it('returns the first records when no cursor is given', () => {
    const db = new InMemoryDatabase<Item>();
    db.insertMany([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(db.getAfter(undefined, 2)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('returns records strictly after the given id', () => {
    const db = new InMemoryDatabase<Item>();
    db.insertMany([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    expect(db.getAfter(2, 2)).toEqual([{ id: 3 }, { id: 4 }]);
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

  it('returns an empty list and null cursor past the end', () => {
    const result = getItems({ lastId: TOTAL_ITEMS, limit: 20 });
    expect(result.items).toHaveLength(0);
    expect(result.lastId).toBeNull();
  });
});
