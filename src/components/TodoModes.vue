<template>
  <div>
    <button 
      v-for="mode in todoModes" 
      :class="{active: selectedMode === mode}" 
      :key="mode" 
      @click="modeSelected(mode)"
    >
      {{mode | capitalize}}
    </button>
  </div>
</template>

<script>

import { dispatchEvent } from '../helpers';

export default {
  name: 'todo-modes',
  data(){
    return {
      selectedMode: 'all',
      todoModes: ['all', 'active', 'completed'],
    }
  },
  filters: {
    capitalize(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    modeSelected(mode){
      this.selectedMode = mode;
      dispatchEvent('selectedMode', mode);
    }
  }
}
</script>

<style>
  
</style>