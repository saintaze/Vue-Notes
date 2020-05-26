<template>
  <div id="todo-list">
    <modal-dialog :showModal="false"/>
    <div class="todo-item " :class="{'note-edit': !editNoteName}">
    <div class="todo-item-left note-item-left"> 
      <div 
        v-if="!editNoteName" 
        class="todo-item-title" 
      >
        <h4>{{note.name}}</h4>
      </div>
      <input 
        v-else 
        class="todo-item-edit" 
        type="text" 
        v-model="note.name" 
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
      >
    </div>
    <div class="todo-item-right">
      <i class="fas fa-pen todo-item-icon" @click="setEditNoteName"></i>
    </div>
    </div>


    <todo-item 
      v-for="(todo, index) in todosFiltered" 
      :key="index" 
      :todo="todo"
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

import TodoItem from '@/components/TodoItem';
import TodoItemsRemaining from '@/components/TodoItemsRemaining';
import TodoCheckAll from '@/components/TodoCheckAll';
import TodoModes from '@/components/TodoModes';
import TodoClearCompleted from '@/components/TodoClearCompleted';
import InputBox from '@/components/InputBox';
import ModalDialog from '@/components/ModalDialog';

import { addListener, removeListener } from '@/helpers';

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
      editNote: null,
      editNoteName: false,
      cachedName: '',
      note: {
        name: 'Groceries',
        todos: [
          {title: 'buy mangoes', completed: false, editing: false},
          {title: 'get red chilli powder', completed: false, editing: false},
          {title: '3 breads 2 apples 8 oranges', completed: false, editing: false}
        ]
      }
    }
  },
  
  computed: {
    remainingTodos(){
      return this.note.todos.filter(t => !t.completed).length;
    },
    noRemainingTodos(){
      return this.remainingTodos === 0;
    },
    todosFiltered(){
      if(this.selectedMode === 'active'){
        return this.note.todos.filter(t => !t.completed);
      }else if(this.selectedMode === 'completed'){
        return this.note.todos.filter(t => t.completed);
      }else{
        return this.note.todos;
      }
    },
    showClearCompletedButton(){
      return this.note.todos.filter(t => t.completed).length > 0
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
      this.note.todos.unshift(todo); 
      // this.note.todos.push(todo)
    },
    removeTodo(index){
      this.note.todos.splice(index, 1);
    },
    doneEdit({index, todo}){
      this.note.todos.splice(index, 1, todo)
    },
    toggleCheckAll(checkAll){ 
      this.note.todos = this.note.todos.map(t => ({...t, completed: checkAll}));
    },
    clearCompleted(){
      this.note.todos = this.note.todos.filter(t => !t.completed);
    },
    toggleComplete({index, completed}){
      this.note.todos[index].completed = completed; 
    },
    setTodosMode(mode){
      this.selectedMode = mode;
    },
    setEditNote(note){
      console.log(note)
      this.editNote = note;
    },
     setEditNoteName(){
      this.editNoteName = true;
      this.cachedName = this.note.name;
    },
     doneEdit(){
      if(!this.note.name.trim().length){
        this.note.name = this.cachedName;
        return;
      }
      this.editNoteName = false;
    },
    cancelEdit(){
      this.note.name = this.cachedName;
      this.editNoteName = false;
    },
  },
  created(){
    addListener('doneEdit', this.doneEdit);
    addListener('addTodo', this.addTodo);
    addListener('removeTodo', this.removeTodo);
    addListener('toggleCheckAll', this.toggleCheckAll);
    addListener('selectedMode', this.setTodosMode);
    addListener('clearCompleted', this.clearCompleted);
    addListener('editNote', this.setEditNote);
  },
  beforeDestroy(){
    removeListener('doneEdit', this.doneEdit);
    removeListener('removeTodo', this.removeTodo);
    removeListener('toggleCheckAll', this.toggleCheckAll);
    removeListener('selectedMode', this.setTodosMode);
    removeListener('clearCompleted', this.clearCompleted);
    removeListener('addTodo', this.addTodo);
    removeListener('editNote', this.setEditNote);

  }
}
</script>


// STYLES

<style lang="scss">

  .note-edit{
    border-bottom: 1px solid lightgrey;
  }

  .note-item-left{
    min-height: 5.2rem;
  }

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


