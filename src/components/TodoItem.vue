<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input 
        class="todo-complete"
        type="checkbox" 
        v-model="todoItem.completed" 
        @change="doneEdit"
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
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
      >
    </div>
    <div class="todo-item-right" :style="{visibility: toggleHideShowEl()}">
      <i class="fas fa-pen todo-item-icon" @click="editTodo"></i>
      <i class="fas fa-times todo-item-icon" @click="removeTodo"></i>
    </div>
  </div>
</template>

<script>

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
      cachedTitle: ''
    }
  },
  watch: {
    todo(){
      this.todoItem = {...this.todo}
    }
  },
  computed: {
    selectedTodoMode(){
      return this.$store.getters.selectedTodoMode;
    }
  },
  methods: {
    editTodo(){
      this.todoItem.editing = true;
      this.cachedTitle = this.todoItem.title;
    },
    doneEdit(){
      if(!this.todoItem.title.trim().length){
        this.todoItem.title = this.cachedTitle;
        return;
      }
      this.todoItem.editing = false;
      this.$store.commit('editTodo', {
        noteIndex: this.noteIndex, 
        todoIndex: this.todoIndex, 
        todo: this.todoItem
      });
    },
    cancelEdit(){
      this.todoItem.title = this.cachedTitle;
      this.todoItem.editing = false;
    },
    removeTodo(){
      this.$store.commit('removeTodo', {noteIndex: this.noteIndex, todoIndex: this.todoIndex});
    },
    toggleHideShowEl(){
      return  this.selectedTodoMode === 'all' ? 'visible': 'hidden';
    }
  }
}
</script>

<style lang="scss">

  .todo-item {
    font-size: 1.7rem;
    margin-bottom: .5rem;
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