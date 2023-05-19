<template>
  <div id="app">
    <div class="test">
      <div class="age">{{ age }}岁</div>
      <div class="birth">{{ birthYear }}年出生</div>
      <div class="btn" @click.stop="incress">+</div>
      <div class="btn" @click.stop="decress">-</div>
    </div>
    <Test :age="age" @changeAge="handleChangeAge" />
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todosRef.length > 0">
        <input
          v-model="allDoneRef"
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul v-if="filteredTodosRef" class="todo-list">
          <li
            v-for="todo in filteredTodosRef"
            :key="todo.id"
            class="todo"
            :class="{
              completed: todo.completed,
              editing: editingTodoRef === todo,
            }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeOne(todo)"></button>
            </div>
            <input
              v-model="todo.title"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              class="edit"
              type="text"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length > 0">
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef === 1 ? "" : "s" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="completedRef"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script setup>
// 导入composition API
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import useEditTodo from "./composition/useEditTodo";
import useRemoveTodo from "./composition/useRemoveTodo";
import { computed, onMounted, reactive, ref, toRef, toRefs, watch } from "vue";

// test
import Test from "./components/test.vue";
let info = reactive({
  name: "jack",
  age: 18,
});
const { age } = toRefs(info);
onMounted(() => {
  console.log(age.value);
});
watch(
  age,
  (val, oldval) => {
    console.log(val, oldval);
  },
  { immediate: true }
);
const birthYear = computed(() => 2023 - age.value - 1);
function incress() {
  age.value++;
}
function decress() {
  age.value--;
}
function handleChangeAge(val) {
  age.value = val;
}

// 调用uesTodoList,得到 todosRef
let { todosRef } = useTodoList();
const { newTodoRef, addTodo } = useNewTodo(todosRef);
const { visibilityRef, filteredTodosRef, remainingRef, completedRef } =
  useFilter(todosRef);
const { editingTodoRef, editTodo, doneEdit, cancelEdit, allDoneRef } =
  useEditTodo(todosRef);
const { removeOne, removeCompleted } = useRemoveTodo(todosRef);
</script>

<style>
.test {
  padding: 20px;
}
.age,
.birth {
  line-height: 30px;
  cursor: pointer;
  font-size: 20px;
}
.btn {
  font-size: 20px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: inline-block;
  margin: 5px 10px;
  cursor: pointer;
  user-select: none;
}
</style>
