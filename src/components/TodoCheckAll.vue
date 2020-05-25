<template>
  <div class="todo-check-all">
    <input 
      class="todo-complete" 
      type="checkbox" 
      :checked="noRemainingTodos" 
      @change="toggleCheckAll($event)"
    >
    <div>Check All</div>
  </div>
</template>

<script>

import { dispatchEvent } from '../helpers';

export default {
  name:"todo-check-all",
  props:{
    noRemainingTodos: Boolean
  },
  methods: {
    toggleCheckAll(e){
      dispatchEvent('toggleCheckAll', e.target.checked);
    }
  }
}
</script>

<style lang="scss">

  .todo-complete {
    cursor: pointer;
  }

  .todo-check-all{
    display: flex;
    align-items: center;

    div {
      margin-left: 2.3rem;
    }
  }
</style>