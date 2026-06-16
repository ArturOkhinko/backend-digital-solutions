import { InMemoryDatabase, Identifiable, Id } from './InMemoryDatabase';

export interface Item extends Identifiable {
  id: Id;
}

export const TOTAL_ITEMS = 1_000_000;

export const itemsDatabase = new InMemoryDatabase<Item>();

export const seedItems = (): void => {
  if (itemsDatabase.size() > 0) {
    return;
  }
  const items: Item[] = new Array(TOTAL_ITEMS);
  for (let id = 1; id <= TOTAL_ITEMS; id += 1) {
    items[id - 1] = { id };
  }
  itemsDatabase.load(items);
};
