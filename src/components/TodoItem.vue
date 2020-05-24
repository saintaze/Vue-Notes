<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input class="todo-complete" type="checkbox" v-model="todoItem.completed" @change="doneEdit">
      <div 
        v-if="!todoItem.editing" 
        class="todo-item-title" 
        :class="{'todo-completed': todo.completed}"
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
    <div class="todo-item-right">
      <i class="fas fa-pen todo-item-icon" @click="editTodo"></i>
      <i class="fas fa-times todo-item-icon"  @click="removeTodo"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: Object,
    index: Number
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
      this.$emit('doneEdit', {index: this.index, todo: this.todoItem});
    },
    cancelEdit(){
      this.todoItem.title = this.cachedTitle;
      this.todoItem.editing = false;
    },
    removeTodo(){
      this.$emit('removeTodo', this.index);
    }
  }
}
</script>

<style>

</style>