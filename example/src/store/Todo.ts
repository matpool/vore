let mockStartId = 1;

export class Todo {
  id: number;
  title = '';
  complete = false;

  constructor(props: Partial<Todo>) {
    this.id = mockStartId++;
    Object.assign(this, props);
  }

  toggle() {
    this.complete = !this.complete;
  }

  get testName() {
    return this.title + '...test';
  }
}
