<template>
  <div 
    class="note-item" 
    :class="{'note-item-selected': selectedIndex === index}" 
    @click="selectNote"
  >
    <div class="note-item-header">
      <h4>{{noteItem.name}}</h4>
      <div class="todo-item-right note-item-right">
        <i class="fas fa-pen todo-item-icon" ></i>
        <i class="fas fa-times todo-item-icon" @click.stop="removeNote"></i>
      </div>
    </div>
    <div 
      class="note-item-todo" 
      v-for="(todo, index) in noteItem.todos.slice(0,4)" 
      :key="index"
    >
      <i class="fas fa-chevron-circle-right"></i>
      {{todo.title}}
    </div>
    <i v-if="noteItem.todos.length > 4" class="fas fa-ellipsis-h"></i>
  </div>
</template>

<script>

import { dispatchEvent } from '@/helpers';

export default {
  name: 'note-item',
  props: {
    note: Object,
    index: Number,
    selectedIndex: Number
  },
  data(){
    return {    
      noteItem: {...this.note}
    }
  },
  watch: {
    note(){
      this.noteItem = {...this.note}
    }
  },
  methods: {
    removeNote(){
      dispatchEvent('removeNote', this.index)
    },
    selectNote(){
      dispatchEvent('selectedNote', this.index)

    }
  },
  created(){
  },
  beforeDestroy(){
  }

}
</script>

<style lang="scss">
  .note-item {
    background-color: #f7f7f7;
    padding: 1.3rem 2.3rem;
    border: 1px solid lightgray;
    margin-bottom: 3rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    word-break: break-all;

    &-selected{
      border-left: 6px solid #41b883;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    }

    &:hover {
      transform: scale(1.01);
      box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.24);
    }

    &-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid lightgray;
      padding: 1.1rem 0 1.9rem;
      margin-bottom: 2rem;
      line-height: 0;

      h4 {
        margin: 0;
        font-weight: 600;
        font-size: 1.9rem;
      }
    }

    &-todo{
      font-size: 1.7rem;
      margin-bottom: .3rem;
    }

    &-right{
      padding-right: .1rem;
    }
  }

  .fa-chevron-circle-right {
    color: #41b883;
    margin-right: .6rem;
    font-size: 1.3rem;
  }

  .fa-ellipsis-h {
    color: lightslategray;
    font-size: 2rem;
    margin: .9rem 0 .6rem;
  }
</style>