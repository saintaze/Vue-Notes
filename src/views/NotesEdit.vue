<template>
  <todo-list />

</template>

<script>
import TodoList from '@/components/TodoList';
import { addListener, removeListener } from '@/helpers';


export default {
  components: {
     TodoList 
  },
  methods: {
    setEditNote(note){
      console.log(note)
    }
  },
  created(){
    addListener('editNote', this.setEditNote);
  },
  beforeDestroy(){
    removeListener('editNote', this.setEditNote);
  }
}
</script>
