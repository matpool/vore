import { Todo } from './Todo';

export class TodoList {
  list: Todo[] = [];

  get remaining() {
    return this.filter('active');
  }

  add(todo: Todo) {
    this.list.unshift(todo);
  }

  remove(id: number) {
    const idx = this.list.findIndex((item) => item.id === id);
    if (idx > -1) {
      this.list.splice(idx, 1);
    }
  }

  clear() {
    this.list = [];
  }

  filter(visibility: 'all' | 'active' | 'completed') {
    if (visibility === 'all') {
      return this.list;
    } else if (visibility === 'active') {
      return this.list.filter((item) => !item.complete);
    } else if (visibility === 'completed') {
      return this.list.filter((item) => item.complete);
    } else {
      return [];
    }
  }

  removeCompleted() {
    this.list = this.filter('active');
  }

  allDone() {
    this.list.forEach((item) => (item.complete = true));
  }

  allActive() {
    this.list.forEach((item) => (item.complete = false));
  }
}
