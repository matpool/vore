<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="todos.list.length" v-cloak>
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.complete, editing: todo == editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.complete" />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.list.length">
      <span class="todo-count">
        <strong>{{ todos.remaining.length }}</strong>
        {{ pluralize(todos.remaining.length) }} left
      </span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility == 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility == 'active' }">
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            :class="{ selected: visibility == 'completed' }"
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.list.length > todos.remaining.length"
      >
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
  </footer>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { store } from './store';
import { Todo } from './store/Todo';

const todos = store.useStore('todoList');
const newTodo = ref('');
const visibility = ref<'all' | 'active' | 'completed'>('all');
const allDone = ref(false);
const editedTodo = ref<Todo>();
const beforeEditCache = ref('');

const filteredTodos = computed(() => todos.filter(visibility.value));
const pluralize = (n: number) => {
  return n === 1 ? 'item' : 'items';
};

const addTodo = () => {
  const value = newTodo.value && newTodo.value.trim();
  if (!value) {
    return;
  }
  todos.add(
    new Todo({
      title: value,
    }),
  );
  newTodo.value = '';
};
const removeCompleted = () => {
  todos.removeCompleted();
};
const editTodo = (todo: Todo) => {
  beforeEditCache.value = todo.title;
  editedTodo.value = todo;
};
const removeTodo = (todo: Todo) => {
  todos.remove(todo.id);
};
const doneEdit = (todo: Todo) => {
  if (!editedTodo.value) {
    return;
  }
  editedTodo.value = undefined;
  todo.title = todo.title.trim();
  if (!todo.title) {
    todos.remove(todo.id);
  }
};
const cancelEdit = (todo: Todo) => {
  editedTodo.value = undefined;
  todo.title = beforeEditCache.value;
};

function onHashChange() {
  var v = window.location.hash.replace(/#\/?/, '');
  if (['all', 'active', 'completed'].includes(v)) {
    visibility.value = v as any;
    todos.filter(v as any);
  } else {
    window.location.hash = '';
    visibility.value = 'all';
  }
}

onMounted(() => {
  window.addEventListener('hashchange', onHashChange);
  onHashChange();
});

watchEffect(() => {
  if (allDone.value) {
    todos.allDone();
  } else {
    todos.allActive();
  }
});
</script>

<style>
.complete {
  color: #666666;
  text-decoration: line-through;
}
</style>
