<template>
  <input 
    type="text"  
    class="input-box" 
    :placeholder="placeholder"
    v-model="inputValue"
    @keyup.enter="addItem"
    
  >
</template>

<script>

import { dispatchEvent } from '@/helpers';

export default {
  name: 'input-box',
  props: {
    placeholder: String,
    eventName: String
  },
  data(){
    return {
      inputValue: ''
    }
  },
  methods: {
    addItem(){
      this.$store.commit(this.eventName, this.inputValue)
      this.inputValue = '';
    }
  }
}
</script>

<style lang="scss">
  .input-box {
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