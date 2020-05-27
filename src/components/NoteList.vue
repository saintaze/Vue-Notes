<template>
  <div>
    <input-box 
      :placeholder="'New Note'" 
      :eventName="'addNote'" 
      @focus="focusAddTodoInput"
    />
    <h3 v-if="!notes.length">Add New Notes</h3>
    <transition name="fade">
      <input-box 
        v-show="selectedNoteIndex !== null"
        :placeholder="'New Todo'" 
        :eventName="'addTodo'"
        ref="addTodoInput"
      />
    </transition>
    <div class="note-list">
      <note-item 
        v-for="(note, index) in notes" 
        :key="index" 
        :index="index"
        :note="note"
      />
    </div>
  </div>
</template>

<script>
import InputBox from '@/components/InputBox';
import NoteItem from '@/components/NoteItem'

export default {
  name: 'note-list',
  components: {
    InputBox,
    NoteItem
  },
  computed: {
    selectedNoteIndex(){
      return this.$store.getters.selectedNoteIndex;
    },
    notes(){
      return this.$store.getters.notes;
    }
  },
  methods: {
    focusAddTodoInput(){
      setTimeout(()=>{this.$refs.addTodoInput.$el.focus()}, 15);
    }
  }
}
</script>

<style lang="scss">
  .note-list {
    margin-top: 1.6rem;
  }
 
</style>