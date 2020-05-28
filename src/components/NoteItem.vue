<template>
  <div 
    class="note-item" 
    :class="{'note-item-selected': selectedNoteIndex === index}" 
    @click="selectNote"
  >
    <div class="note-item-header">
      <h4>{{noteItem.name}}</h4>
      <div class="todo-item-right note-item-right">
        <i class="fas fa-pen todo-item-icon" @click.stop="editNote"></i>
        <i class="fas fa-times todo-item-icon" @click.stop="openModal"></i>
      </div>
    </div>
    <div 
      class="note-item-todo" 
      v-for="(todo, index) in noteItem.todos.slice(0,4)" 
      :key="index"
    >
      <i class="fas fa-chevron-circle-right"></i>
      {{todo.title}}
    </div>
    <transition name="fade">
      <i v-if="noteItem.todos.length > 4" class="fas fa-ellipsis-h"></i>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'note-item',
  props: {
    note: Object,
    index: Number
  },
  data(){
    return {    
      noteItem: {...this.note}
    }
  },
  watch: {
    note(){
      this.noteItem = {...this.note}
    },
    modalAction(){
      if(this.modalActiveItemIndex === this.index){
        this.removeNote();
        this.resetModalVals();
      }
    }
  },
  computed: {
    selectedNoteIndex(){
      return this.$store.getters.selectedNoteIndex;
    },
    modalAction(){
      return this.$store.getters.modalAction;
    },
    modalActiveItemIndex(){
      return this.$store.getters.modalActiveItemIndex;
    }
  },
  methods: {
    removeNote(){
      if(this.modalAction){
        this.$store.commit('removeNote', this.index);
      }
    },
    selectNote(){
      this.$store.commit('setSelectedNote', this.index);
    },
    editNote(){
      this.$router.push(`notes/${this.index}/edit`);
    },
    openModal(){
      this.$store.commit('setShowModal', true);
      this.$store.commit('setModalActiveItemIndex', this.index);
    },
    resetModalVals(){
      this.$store.commit('setModalAction', null);
      this.$store.commit('setModalActiveItemIndex', null);
    }
  }

}
</script>


<style lang="scss">
  .note-item {
    background-color: #f7f7f7;
    padding: 1.3rem 2.1rem;
    border: 1px solid lightgray;
    margin-bottom: 3rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    word-break: break-all;

    &-selected{
      border-left: 7px solid #47c98f;
    }

    &:hover, &-selected {
      transform: scale(1.02);
      box-shadow: 0 4px 6px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.24);
    }

    &-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid lightgray;
      padding: 1.1rem 0 1.9rem;
      margin-bottom: 2rem;
      line-height: 0;

      h4 {
        margin: 0;
        font-weight: 600;
        font-size: 1.9rem;
      }
    }

    &-todo{
      font-size: 1.7rem;
      margin-bottom: .3rem;
    }

    &-right{
      padding-right: .1rem;
    }
  }

  .fa-chevron-circle-right {
    color: #41b883;
    margin-right: .6rem;
    font-size: 1.2rem;
  }

  .fa-ellipsis-h {
    color: lightslategray;
    font-size: 2rem;
    margin: .9rem 0 .6rem;
  }
</style>


