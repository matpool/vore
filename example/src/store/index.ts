import { createStore } from 'vue-store';
import { TodoList } from './TodoList';

export const store = createStore({ todoList: TodoList });
