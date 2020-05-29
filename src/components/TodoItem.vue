<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input 
        class="todo-complete"
        type="checkbox" 
        v-model="todoItem.completed" 
        @change="toggleCheck"
        v-if="this.selectedTodoMode === 'all'"
      >
      <div 
        v-if="!todoItem.editing" 
        class="todo-item-title" 
        :class="{'todo-item-completed': todoItem.completed, 'hide-control': this.selectedTodoMode !== 'all'}"
      >
        {{todoItem.title}}
      </div>
      <input 
        v-else 
        class="todo-item-edit" 
        type="text" 
        v-model="todoItem.title" 
        @keyup.enter="shouldEdit"
        @keyup.esc="shouldCancelEdit"
      >
    </div>
    <div class="todo-item-right" :style="{visibility: toggleHideShowEl()}">
      <i class="fas fa-pen todo-item-icon" @click="startEditing"></i>
      <i class="fas fa-times todo-item-icon" @click="shouldRemoveTodo"></i>
    </div>
  </div>
</template>

<script>
import {openModal, closeModal} from '@/helpers';

export default {
  name: 'todo-item',
  props: {
    todo: Object,
    todoIndex: Number,
    noteIndex: Number
  },
  data(){
    return {
      todoItem: {...this.todo},
      cachedTitle: '',
      modalTask: ''
    }
  },
  watch: {
    todo(){
      this.todoItem = {...this.todo}
    },
    modalAction(){
      if(this.modalActivatingComponent === 'todoItem' && this.modalActiveItemIndex === this.todoIndex){
        if(this.modalTask === 'removeTodo') this.removeTodo();
        if(this.modalTask === 'doneEdit') this.doneEdit();
        if(this.modalTask === 'doneCancelEdit') this.doneCancelEdit();
        closeModal(this);
      }
    }
  },
  computed: {
    selectedTodoMode(){
      return this.$store.getters.selectedTodoMode;
    },
    modalAction(){
      return this.$store.getters.modalAction;
    },
    modalActiveItemIndex(){
      return this.$store.getters.modalActiveItemIndex;
    },
    modalActivatingComponent(){
      return this.$store.getters.modalActivatingComponent;
    }
  },
  methods: {
    startEditing(){
      this.todoItem.editing = true;
      this.cachedTitle = this.todoItem.title;
    },
    shouldEdit(){
      if(!this.todoItem.title.trim().length){
        this.todoItem.title = this.cachedTitle;
        return 
      }
      if(this.todoItem.title === this.cachedTitle){
        this.todoItem.editing = false;
        return;
      }
      openModal(this, 'todoItem', 'doneEdit', this.todoIndex);
    },
    editTodo(){
      this.$store.commit('editTodo', {
        noteIndex: this.noteIndex, 
        todoIndex: this.todoIndex, 
        todo: this.todoItem
      });
    },
    doneEdit(){   
      if(this.modalAction){
        this.todoItem.editing = false;
        this.editTodo();
      }
    },
    shouldCancelEdit(){
      if(!this.todoItem.title.trim().length || this.todoItem.title === this.cachedTitle){
        this.todoItem.title = this.cachedTitle;
        this.todoItem.editing = false;
        return;
      }
      openModal(this, 'todoItem', 'doneCancelEdit', this.todoIndex);
    },
    doneCancelEdit(){
      if(this.modalAction){
        this.todoItem.title = this.cachedTitle;
        this.todoItem.editing = false;
      }
    },
    shouldRemoveTodo(){
      openModal(this, 'todoItem', 'removeTodo', this.todoIndex);
    },
    removeTodo(){
      if(this.modalAction){
        this.$store.commit('removeTodo', {noteIndex: this.noteIndex, todoIndex: this.todoIndex});
      }
    },
    toggleCheck(){
      this.editTodo();
    },  
    toggleHideShowEl(){
      return this.selectedTodoMode === 'all' ? 'visible': 'hidden';
    }
  }
} 
</script>

<style lang="scss">

  .todo-item {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    word-break: break-all;

    &-right, &-left {
      display: flex;
      align-items: center;
    }

    &-left {
      flex-grow: .98
    }

    &-title {
      padding: 1rem;
      border: 1px solid white;
      margin-left: .7rem;
    }

    &-edit {
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

    &-icon {
      cursor: pointer;
      margin-left: 1.6rem;
      font-size: 1.4rem;
      color: lightslategray;

      &:hover {
        color: #555;
        transform: scale(1.2);
        transition: all .3s ease-in-out;
        backface-visibility: hidden;
      }
    }

    &-completed {
      color: grey;
      text-decoration: line-through;
    }
  }

  .fa-times {
    font-size: 1.6rem;
  }

  .hide-control{
    padding-left: 0;
    margin-left: 0;
  }

</style>