<template>
  <div>
    <button 
      v-for="mode in todoModes" 
      :key="mode" 
      :class="{active: selectedTodoMode === mode}" 
      @click="modeSelected(mode)"
    >
      {{mode | capitalize}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'todo-modes',
  data(){
    return {
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
      this.$store.commit('setSelectedTodoMode', mode);
    }
  },
  computed: {
    selectedTodoMode(){
      return this.$store.getters.selectedTodoMode;
    }
  }
}
</script>

