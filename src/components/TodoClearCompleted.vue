<template>
  <transition name="fade">
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
  </transition>
</template>

<script>

import { dispatchEvent } from '../helpers';

export default {
  name: 'todo-clear-completed',
  props: {
    showClearCompletedButton: Boolean
  },
  methods: {
    clearCompleted(){
      dispatchEvent('clearCompleted');
    }
  }
}
</script>

<style>

</style>