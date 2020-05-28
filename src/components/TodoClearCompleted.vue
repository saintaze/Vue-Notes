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

export default {
  name: 'todo-clear-completed',
  props: {
    noteIndex: Number
  },
  watch: {
    modalAction(){
      this.clearCompleted();
      this.resetModalVals();
    }
  },
  computed: {
    showClearCompletedButton(){
      return this.$store.getters.showClearCompletedButton(this.noteIndex)
    },
    modalAction(){
      return this.$store.getters.modalAction;
    },
    modalActiveItemIndex(){
      return this.$store.getters.modalActiveItemIndex;
    }
  },
  methods: {
    shouldClearCompleted(){
      this.openModal();
    },
    clearCompleted(){
      if(this.modalAction){
        this.$store.commit('clearCompletedTodos', this.noteIndex);
      }
    },
    openModal(){
      this.$store.commit('setShowModal', true);
    },
    resetModalVals(){
      this.$store.commit('setModalAction', null);
      this.$store.commit('setModalActiveItemIndex', null);
    }
  }
}
</script>
