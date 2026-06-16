import { InMemoryDatabase, Identifiable } from './InMemoryDatabase';

export interface Item extends Identifiable {
  id: number;
}

// ids from 1 to 1_000_000 inclusive.
export const TOTAL_ITEMS = 1_000_000;

export const itemsDatabase = new InMemoryDatabase<Item>();

/**
 * Seeds the in-memory database with items (id 1..TOTAL_ITEMS).
 * Idempotent: does nothing if already seeded.
 */
export const seedItems = (): void => {
  if (itemsDatabase.size() > 0) {
    return;
  }
  const items: Item[] = new Array(TOTAL_ITEMS);
  for (let id = 1; id <= TOTAL_ITEMS; id += 1) {
    items[id - 1] = { id };
  }
  itemsDatabase.insertMany(items);
};
