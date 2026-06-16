export type Id = string | number;

export interface Identifiable {
  id: Id;
}

export type IdComparator = (a: Id, b: Id) => number;

export const defaultCompare: IdComparator = (a, b) => {
  const aIsNumber = typeof a === 'number';
  const bIsNumber = typeof b === 'number';
  if (aIsNumber && bIsNumber) {
    return a - b;
  }
  if (aIsNumber) {
    return -1;
  }
  if (bIsNumber) {
    return 1;
  }
  const aStr = String(a);
  const bStr = String(b);
  if (aStr < bStr) {
    return -1;
  }
  if (aStr > bStr) {
    return 1;
  }
  return 0;
};

export class InMemoryDatabase<T extends Identifiable> {
  private records: T[] = [];

  private index = new Map<Id, T>();

  private readonly compare: IdComparator;

  constructor(compare: IdComparator = defaultCompare) {
    this.compare = compare;
  }

  has(id: Id): boolean {
    return this.index.has(id);
  }

  getById(id: Id): T | undefined {
    return this.index.get(id);
  }

  size(): number {
    return this.records.length;
  }

  clear(): void {
    this.records = [];
    this.index.clear();
  }

  insert(record: T): void {
    if (this.index.has(record.id)) {
      throw new Error(`Duplicate id: ${String(record.id)}`);
    }
    const insertIndex = this.findInsertIndex(record.id);
    this.records.splice(insertIndex, 0, record);
    this.index.set(record.id, record);
  }

  insertMany(records: T[]): void {
    records.forEach((record) => this.insert(record));
  }

  load(records: T[]): void {
    records.forEach((record) => {
      this.records.push(record);
      this.index.set(record.id, record);
    });
  }

  getAfter(afterId: Id | undefined, limit: number): T[] {
    const startIndex = afterId === undefined ? 0 : this.findFirstIndexAfter(afterId);
    return this.records.slice(startIndex, startIndex + limit);
  }

  private findFirstIndexAfter(id: Id): number {
    let low = 0;
    let high = this.records.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (this.compare(this.records[mid].id, id) <= 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }

  private findInsertIndex(id: Id): number {
    let low = 0;
    let high = this.records.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (this.compare(this.records[mid].id, id) < 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
}
