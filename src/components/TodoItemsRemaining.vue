<template>
  <div>{{remainingTodos}} {{remainingTodos === 1 ? 'item' : 'items'}} left</div>
</template>

<script>
export default {
  name:"todo-items-remaining",
  props:{
    noteIndex: Number
  },
  computed: {
    remainingTodos(){
      return this.$store.getters.remainingTodos(this.noteIndex);
    }
  }
}
</script>
