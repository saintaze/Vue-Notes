<template>
  <input 
    type="text"  
    class="todo-input" 
    placeholder="New Todo" 
    v-model="inputValue"
    @keyup.enter="addItem"
  >
</template>

<script>

import { dispatchEvent } from '../helpers';

export default {
  name: 'input-box',
  data(){
    return {
      inputValue: ''
    }
  },
  methods: {
    addItem(){
      dispatchEvent('addItem', this.inputValue);
      this.inputValue = '';
    }
  }
}
</script>

<style lang="scss">
  .todo-input {
    width: 100%;
    padding: 1.4rem 1.8rem;
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
    font-family: inherit;
    border: 1px solid lightgrey;
    color: inherit;

    &:focus {
      outline: none;
    }
  }
</style>