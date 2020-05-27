<template>
  <transition name="fade">
    <button 
      v-if="showClearCompletedButton" 
      @click="clearCompleted"
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
  methods: {
    clearCompleted(){
      this.$store.commit('clearCompletedTodos', this.noteIndex);
    },
  },
  computed: {
    showClearCompletedButton(){
      return this.$store.getters.showClearCompletedButton(this.noteIndex)
    }
  }
}
</script>
