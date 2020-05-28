<template>
  <div class="todo-check-all">
    <input 
      class="todo-complete" 
      type="checkbox" 
      :checked="noRemainingTodos" 
      @change="toggleCheckAllTodos($event)"
    >
    <div>Check All</div>
  </div>
</template>

<script>

export default {
  name:"todo-check-all",
  props:{
    noteIndex: Number
  },
  computed: {
    noRemainingTodos(){
      return this.$store.getters.noRemainingTodos(this.noteIndex);
    },
  },
  methods: {
    toggleCheckAllTodos(e){
      this.$store.commit('toggleCheckAllTodos', {index: this.noteIndex, checked: e.target.checked});
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



