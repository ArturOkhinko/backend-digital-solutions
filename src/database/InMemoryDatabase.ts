export interface Identifiable {
  id: number;
}

/**
 * Very small in-memory store for reading and writing records.
 * Records are kept in insertion order; pagination via `getAfter`
 * assumes records are inserted with ascending ids.
 */
export class InMemoryDatabase<T extends Identifiable> {
  private records: T[] = [];

  private index = new Map<number, T>();

  insert(record: T): void {
    this.records.push(record);
    this.index.set(record.id, record);
  }

  insertMany(records: T[]): void {
    records.forEach((record) => this.insert(record));
  }

  getById(id: number): T | undefined {
    return this.index.get(id);
  }

  size(): number {
    return this.records.length;
  }

  clear(): void {
    this.records = [];
    this.index.clear();
  }

  /**
   * Returns up to `limit` records ordered by id.
   * When `afterId` is provided, records start strictly after that id;
   * otherwise the first records are returned.
   */
  getAfter(afterId: number | undefined, limit: number): T[] {
    const startIndex = afterId === undefined ? 0 : this.findFirstIndexAfter(afterId);
    return this.records.slice(startIndex, startIndex + limit);
  }

  private findFirstIndexAfter(id: number): number {
    let low = 0;
    let high = this.records.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (this.records[mid].id <= id) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
}
