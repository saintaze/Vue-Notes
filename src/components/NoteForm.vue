<template>
  <div class="note-form">
    <input 
      class="input-box" 
      type="text" 
      placeholder="New Note" 
      v-model="noteTitle"
      @keyup.enter="addNoteTitle"
    >
    <input 
      class="input-box" 
      type="text" 
      placeholder="Note Todo" 
      v-model="noteTodoTitle"
      @keyup.enter="addNoteTodo"

    >

  </div>
</template>

<script>
import InputBox from '@/components/InputBox'
import { addListener, removeListener } from '@/helpers';


export default {
  name: 'note-form',
  components: {
    InputBox
  },
  data(){
    return {
      noteTitle: '',
      noteTodoTitle: '',
      note: {}
    }
  },
  methods: {
    addNoteTitle(){
      if(!noteTitle.trim().length) return;
      this.note.title = noteTitle;
    },
    addNoteTodo(){
      if(!noteTitle.trim().length) return;
      const newTodo = 
      this.note.title = noteTitle;
    }
  },
  created(){
    addListener('addItem', this.addItem);
  },
  beforeDestroy(){
    removeListener('addItem', this.addTodo);
  }

}
</script>

<style>

</style>