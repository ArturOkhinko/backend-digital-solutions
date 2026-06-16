import { Id } from './InMemoryDatabase';

export interface SelectionPage {
  ids: Id[];
  lastId: Id | null;
}

export class SelectionStore {
  private order: Id[] = [];

  private members = new Set<Id>();

  has(id: Id): boolean {
    return this.members.has(id);
  }

  size(): number {
    return this.order.length;
  }

  clear(): void {
    this.order = [];
    this.members.clear();
  }

  add(id: Id): boolean {
    if (this.members.has(id)) {
      return false;
    }
    this.order.push(id);
    this.members.add(id);
    return true;
  }

  remove(id: Id): boolean {
    if (!this.members.has(id)) {
      return false;
    }
    this.members.delete(id);
    this.order.splice(this.order.indexOf(id), 1);
    return true;
  }

  reorder(id: Id, afterId: Id | null): boolean {
    if (!this.members.has(id)) {
      return false;
    }
    if (afterId !== null && !this.members.has(afterId)) {
      return false;
    }
    this.order.splice(this.order.indexOf(id), 1);
    if (afterId === null) {
      this.order.unshift(id);
    } else {
      this.order.splice(this.order.indexOf(afterId) + 1, 0, id);
    }
    return true;
  }

  getAfter(afterId: Id | undefined, limit: number, query?: string): SelectionPage {
    const start = afterId === undefined ? 0 : this.order.indexOf(afterId) + 1;
    const from = start < 0 ? 0 : start;
    const ids: Id[] = [];
    for (let i = from; i < this.order.length && ids.length < limit; i += 1) {
      const id = this.order[i];
      if (!query || String(id).includes(query)) {
        ids.push(id);
      }
    }
    return { ids, lastId: ids.length > 0 ? ids[ids.length - 1] : null };
  }
}

export const selectionStore = new SelectionStore();
