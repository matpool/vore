import { Store } from 'vore';
import { TodoList } from './TodoList';

export const store = new Store({
  todoList: new TodoList(),
});
