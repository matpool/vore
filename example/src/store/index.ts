import { createStore } from 'vore';
import { TodoList } from './TodoList';

export const store = createStore({ todoList: TodoList });
