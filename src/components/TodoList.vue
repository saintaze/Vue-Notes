<template>
  <div id="todo-list">
    <input 
      type="text"  
      class="todo-input" 
      placeholder="New Todo" 
      v-model="newTodoTitle"
      @keyup.enter="addTodo"
    >

    <todo-item 
      v-for="(todo, index) in todosFiltered" 
      :key="index" 
      :todo.sync="todo"
      :index="index"
      @doneEdit="doneEdit"
      @removeTodo="removeTodo"
    >
    </todo-item>
          
    <div class="todo-modes">
      <div class="todo-check-all">
        <input 
          class="todo-complete" 
          type="checkbox" 
          :checked="noRemainingTodos" 
          @change="toggleCheckAll($event)"
        >
        <div>Check All</div>
      </div>
      <div>{{remainingTodos}} {{remainingTodos === 1 ? 'item' : 'items'}} left</div>
    </div>

    <div class="todo-modes">
      <div>
        <button 
          v-for="mode in todoModes" 
          :class="{active: selectedMode === mode}" 
          :key="mode" 
          @click="selectedMode = mode"
          >
          {{mode | capitalize}}
        </button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>
    </div>
  </div>
</template>

// JS

<script>

import TodoItem from './TodoItem';

export default {
  name: 'todo-list',
  components: {
    TodoItem
  },
  data (){
    return {
      selectedMode: 'all',
      todoModes: ['all', 'active', 'completed'],
      newTodoTitle: '',
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
  filters: {
    capitalize(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
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
    addTodo (){
      if(!this.newTodoTitle.trim().length) return;
      const todo = {
        title: this.newTodoTitle,
        completed: false,
        editing: false
      }
      // this.todos.push(todo);
      this.todos.unshift(todo); 
      this.newTodoTitle = '';
    },
    removeTodo(index){
      this.todos.splice(index, 1);
    },
    doneEdit({index, todo}){
      this.todos.splice(index, 1, todo)
    },
    toggleCheckAll(e){
      this.todos = this.todos.map(t => ({...t, completed: e.target.checked}));
    },
    clearCompleted(){
      this.todos = this.todos.filter(t => !t.completed);
    },
    toggleComplete({index, completed}){
      this.todos[index].completed = completed; 
    }
  }
}
</script>


// STYLES

<style lang="scss">
  .todo-input {
    width: 100%;
    padding: 1.4rem 1.8rem;
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
    font-family: inherit;
    border: 1px solid lightgrey;
    color: inherit;

    &:focus {
      outline: none;
    }
  }

  .todo-item {
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    word-break: break-all;
  }

  .todo-item-right {
    display: flex;
    align-items: center;
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-title {
    padding: 1rem;
    border: 1px solid white;
    margin-left: 1.2rem;
  }

  .todo-item-edit {
    font-size: inherit;
    line-height: inherit;
    font-family: inherit;
    color: #2c3e50;
    margin-left: 1.2rem;
    width: 100%;
    padding: 1rem;
    border: 1px solid #ccc;
 
    &:focus {
      outline: none;
    }
  }

  .todo-item-remove {
    cursor: pointer;
    margin-left: 1.6rem;
    font-size: 1.4rem;

    &:hover {
      color: #000;
      transform: scale(1.12);
      transition: all .3s ease-in-out;
    }
  }

  .todo-item-icon {
    cursor: pointer;
    margin-left: 1.6rem;
    font-size: 1.4rem;
    color: lightslategray;

    &:hover {
      color: #555;
      transform: scale(1.12);
      transition: all .3s ease-in-out;
      backface-visibility: hidden;
    }
  }

  .todo-complete {
    cursor: pointer;
  }

  .todo-completed {
    color: grey;
    text-decoration: line-through;
  }

  .todo-check-all{
    display: flex;
    align-items: center;

    div {
      margin-left: 2.3rem;
    }
  }

  .fa-times {
    font-size: 1.6rem;
  }

  .todo-modes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6rem;
    border-top: 1px solid lightgrey;
    padding-top: 1.4rem;
    margin-bottom: 1.4rem;
  }

  .todo-modes:last-child{
    padding-top: 2rem;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    color: inherit;
    font-size: 1.4rem;
    background-color: white;
    padding: 0.3rem 1.3rem;
    border: 1px solid lightgrey;

    &:hover {
      transition: all .2s;
      background-color: #d4ebd0;
      border: 1px solid #7dc97d;
    }

    &:not(:first-child){
      margin-left: .5rem;
    }
    &:focus {
      outline: none;
    }
  }

  .active {
    transition: all .3s;
    background-color: #cceabb;
    border: 1px solid #20b2aab0;
  }

  .fade-enter-active, .fade-leave-active{
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>


