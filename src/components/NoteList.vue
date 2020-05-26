<template>
  <div>
    <input-box :placeholder="'New Note'" :eventName="'addNote'"/>
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
  computed: {
    selectedIndex(){
      return this.$store.getters.selectedIndex;
    },
    notes(){
      return this.$store.getters.notes;
    }
  }
}
</script>

<style lang="scss">
  .note-list {
    margin-top: 1.6rem;
  }
 
</style>