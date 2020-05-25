<template>
  <div id="todo-list">
    <modal-dialog :showModal="true"/>
    <input-box />

    <todo-item 
      v-for="(todo, index) in todosFiltered" 
      :key="index" 
      :todo.sync="todo"
      :index="index"
    />

    <div class="todo-modes">
      <todo-check-all :noRemainingTodos="noRemainingTodos" />
      <todo-items-remaining :remainingTodos="remainingTodos" />
    </div>

    <div class="todo-modes">
      <todo-modes />
      <todo-clear-completed :showClearCompletedButton="showClearCompletedButton"/>
    </div>

  </div>
</template>

// JS

<script>

import TodoItem from './TodoItem';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoCheckAll from './TodoCheckAll';
import TodoModes from './TodoModes';
import TodoClearCompleted from './TodoClearCompleted';
import InputBox from './InputBox';
import ModalDialog from './ModalDialog';

import { addListener, removeListener } from '../helpers';

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoCheckAll,
    TodoItemsRemaining,
    TodoModes,
    TodoClearCompleted,
    InputBox,
    ModalDialog
  },
  data (){
    return {
      selectedMode: 'all',
      todos: [
        {
          title: 'eat the cat',
          completed: true,
          editing: false
        },
        {
          title: 'Talk to tania',
          completed: false,
          editing: false
        }
      ]
    }
  },
  
  computed: {
    remainingTodos(){
      return this.todos.filter(t => !t.completed).length;
    },
    noRemainingTodos(){
      return this.remainingTodos === 0;
    },
    todosFiltered(){
      if(this.selectedMode === 'active'){
        return this.todos.filter(t => !t.completed);
      }else if(this.selectedMode === 'completed'){
        return this.todos.filter(t => t.completed);
      }else{
        return this.todos;
      }
    },
    showClearCompletedButton(){
      return this.todos.filter(t => t.completed).length > 0
    }
  },
  methods: {
    addTodo(newTodoTitle){
      if(!newTodoTitle.trim().length) return;
      const todo = {
        title: newTodoTitle,
        completed: false,
        editing: false
      }
      this.todos.unshift(todo); 
      // this.todos.push(todo)
    },
    removeTodo(index){
      this.todos.splice(index, 1);
    },
    doneEdit({index, todo}){
      this.todos.splice(index, 1, todo)
    },
    toggleCheckAll(checkAll){ 
      this.todos = this.todos.map(t => ({...t, completed: checkAll}));
    },
    clearCompleted(){
      this.todos = this.todos.filter(t => !t.completed);
    },
    toggleComplete({index, completed}){
      this.todos[index].completed = completed; 
    },
    setTodosMode(mode){
      this.selectedMode = mode;
    }
  },
  created(){
    addListener('doneEdit', this.doneEdit);
    addListener('addItem', this.addTodo)
    addListener('removeTodo', this.removeTodo);
    addListener('toggleCheckAll', this.toggleCheckAll);
    addListener('selectedMode', this.setTodosMode);
    addListener('clearCompleted', this.clearCompleted);
  },
  beforeDestroy(){
    removeListener('doneEdit', this.doneEdit);
    removeListener('removeTodo', this.removeTodo);
    removeListener('toggleCheckAll', this.toggleCheckAll);
    removeListener('selectedMode', this.setTodosMode);
    removeListener('clearCompleted', this.clearCompleted);
    removeListener('addItem', this.addTodo);
  }
}
</script>


// STYLES

<style lang="scss">

  .todo-modes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6rem;
    border-top: 1px solid lightgrey;
    padding-top: 1.4rem;
    margin-bottom: 1.4rem;

    &:last-child {
      padding-top: 2rem;
    }
  }

  .active {
    transition: all .3s;
    background-color: #cceabb;
    border: 1px solid #20b2aab0;
  }

  .fade {
    &-enter-active, &-leave-active {
      transition: opacity .2s;
    }

    &-enter, &-leave-to{
      opacity: 0;
    } 
  }

</style>


