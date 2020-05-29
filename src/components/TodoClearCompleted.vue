<template>
  <transition name="fade">
    <button 
      v-if="showClearCompletedButton" 
      @click="shouldClearCompleted"
    >
      Clear Completed
    </button>
  </transition>
</template>

<script>
import {openModal, closeModal} from '@/helpers';

export default {
  name: 'todo-clear-completed',
  props: {
    noteIndex: Number
  },
  watch: {
    modalAction(){
      if(this.modalActivatingComponent === 'clearCompleted'){
        this.clearCompleted();
        closeModal(this);
      }
    }
  },
  computed: {
    showClearCompletedButton(){
      return this.$store.getters.showClearCompletedButton(this.noteIndex);
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
    shouldClearCompleted(){
      openModal(this, 'clearCompleted', null, this.noteIndex);
    },
    clearCompleted(){
      if(this.modalAction){
        this.$store.commit('clearCompletedTodos', this.noteIndex);
      }
    }
  }
}
</script>
