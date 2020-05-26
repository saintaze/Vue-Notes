<template>
  <div>
    <input-box :placeholder="'New Todo'" :eventName="'addNote'"/>
    <transition name="fade">
      <input-box 
        v-if="selectedIndex !== null"
        :placeholder="'New Todo'" 
        :eventName="'addTodo'"
      />
    </transition>
    <div class="note-list">
      <note-item 
        v-for="(note, index) in notes" 
        :key="index" 
        :index="index"
        :note="note"
        :selectedIndex="selectedIndex"
      />
    </div>
  </div>
</template>

<script>
import InputBox from '@/components/InputBox';
import NoteItem from '@/components/NoteItem'

import {Todo, Note} from '@/models';
import { addListener, removeListener } from '@/helpers';

export default {
  name: 'note-list',
  components: {
    InputBox,
    NoteItem
  },
  data(){
    return {    
      selectedIndex: null,
      notes: [
        {
          name: 'Groceries',
          todos: [
            {title: 'buy mangoes', completed: false, editing: false},
            {title: 'get red chilli powder', completed: false, editing: false},
            {title: '3 breads 2 apples 8 oranges', completed: false, editing: false}
          ]
        },
        {
          name: 'Boxing',
          todos: [
            {title: 'train for boxing', completed: false, editing: false},
            {title: 'strengthen muscles in the arms', completed: false, editing: false},
            {title: 'climb 3 flights fo stairs', completed: false, editing: false},{title: 'strengthen muscles in the armswj jejwj jewje jewjejw ejwjewj ejwekjwj', completed: false, editing: false},
            {title: 'climb 3 flights fo stairs', completed: false, editing: false},
            {title: 'strengthen muscles in the arms', completed: false, editing: false},
          ]
        }
      ]
    }
  },
  methods: {
    removeNote(index){
      if(this.selectedIndex === index) this.selectedIndex = null;
      this.notes.splice(index, 1);
    },
    addNote(newNoteName){
      if(!newNoteName.trim().length) return;
      this.notes.unshift(new Note(newNoteName));
      this.selectedIndex = 0;
    },
    addTodo(newTodoTitle){
      if(!newTodoTitle.trim().length) return;
      const newTodo = new Todo(newTodoTitle);
      this.notes[this.selectedIndex].todos.unshift(newTodo);
    },
    selectedNote(index){
      this.selectedIndex = index
    }
  },
  created(){
    addListener('removeNote', this.removeNote);
    addListener('selectedNote', this.selectedNote);
    addListener('addNote', this.addNote);
    addListener('addTodo', this.addTodo);
  },
  beforeDestroy(){
    removeListener('removeNote', this.removeNote);
    removeListener('selectedNote', this.selectedNote);
    removeListener('addNote', this.addNote);
    removeListener('addTodo', this.addTodo);
  }

}
</script>

<style lang="scss">
  .note-list {
    margin-top: 1.6rem;
  }
 
</style>