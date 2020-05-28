<template>
  <div id="todo-list">
    <div 
      class="todo-item" 
      :class="{'note-edit': !editNoteName, 'no-border': !todosFiltered.length}"
    >
      <div class="todo-item-left note-item-left" > 
        <div 
          v-if="!editNoteName" 
          class="todo-item-title note-title" 
        >
          <h4>{{note.name}}</h4>
        </div>
        <input 
          v-else 
          class="todo-item-edit" 
          type="text" 
          v-model="note.name" 
          @keyup.enter="shouldEdit"
          @keyup.esc="shouldCancelEdit"
        >
      </div>
      <div class="todo-item-right">
        <i class="fas fa-pen todo-item-icon" @click="setEditNoteName"></i>
      </div>
    </div>

    <todo-item 
      v-for="(todo, index) in todosFiltered" 
      :key="index" 
      :todo="todo"
      :todoIndex="index"
      :noteIndex="noteIndex"
    />

    <div class="todo-modes">
      <todo-check-all :noteIndex="noteIndex" :style="{visibility: toggleHideShowEl()}" />
      <todo-items-remaining :noteIndex="noteIndex" />
    </div>

    <div class="todo-modes">
      <todo-modes />
      <todo-clear-completed :noteIndex="noteIndex" />
    </div>

  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';
import TodoItemsRemaining from '@/components/TodoItemsRemaining';
import TodoCheckAll from '@/components/TodoCheckAll';
import TodoModes from '@/components/TodoModes';
import TodoClearCompleted from '@/components/TodoClearCompleted';

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoCheckAll,
    TodoItemsRemaining,
    TodoModes,
    TodoClearCompleted
  },
  data (){
    return {
      editNoteName: false,
      cachedName: '',
      noteIndex: +this.$route.params.id,
      modalTask: ''
    }
  },
  watch: {
    modalAction(){
      if(this.modalActivatingComponent === 'todoList' && this.modalActiveItemIndex === this.noteIndex){
        if(this.modalTask === 'doneEdit') this.doneEdit();
        if(this.modalTask === 'doneCancelEdit') this.doneCancelEdit();
        this.resetModalVals();
      }
    }
  },
  computed: {
    note(){
      return this.$store.getters.note(this.noteIndex);
    },
    todosFiltered(){
      return this.$store.getters.todosFiltered(this.noteIndex);
    },
    selectedTodoMode(){
      return this.$store.getters.selectedTodoMode;
    },
    modalAction(){
      return this.$store.getters.modalAction;
    },
    modalActiveItemIndex(){
      return this.$store.getters.modalActiveItemIndex;
    },
    modalActivatingComponent(){
      return this.$store.getters.modalActivatingComponent;
    }
  },
  methods: {
     setEditNoteName(){
      this.editNoteName = true;
      this.cachedName = this.note.name;
    },
    shouldEdit(){
      if(!this.note.name.trim().length){
        this.note.name = this.cachedName;
        return 
      }
      if(this.note.name === this.cachedName){
        this.editNoteName = false;
        return;
      }
      this.openModal('doneEdit');
    },
    doneEdit(){   
      if(this.modalAction){
        this.editNoteName = false;
        this.$store.commit('editNoteName', {index: this.noteIndex, name: this.note.name});
      }
    },
    shouldCancelEdit(){
      if(!this.note.name.trim().length || this.note.name === this.cachedName){
        this.cancelEdit();
        return;
      }
      this.openModal('doneCancelEdit');
    },
    doneCancelEdit(){
      if(this.modalAction) this.cancelEdit();
    },
    cancelEdit(){
      this.note.name = this.cachedName;
      this.editNoteName = false;
    },
    toggleHideShowEl(){
      return this.selectedTodoMode === 'all' ? 'visible': 'hidden';
    },
    openModal(task){
      this.modalTask = task
      this.$store.commit('setModalActivatingComponent', 'todoList');
      this.$store.commit('setShowModal', true);
      this.$store.commit('setModalActiveItemIndex', this.noteIndex);
    },
    resetModalVals(){
      this.$store.commit('setModalAction', null);
      this.$store.commit('setModalActiveItemIndex', null);
    }
  }
}
</script>


<style lang="scss">

  .note-edit{
    border-bottom: 1px solid lightgrey;
  }

  .note-item-left{
    min-height: 5.2rem;
  }

  .note-title {
    padding: 0;
    margin: 0;

    h4 {
      font-size: 1.9rem;
    }
  }

  .no-border{
    border: none;
  }

  .todo-modes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6rem;
    border-top: 1px solid lightgrey;
    padding-top: 1.4rem;
    margin-bottom: 1.4rem;

    &:last-child {
      padding-top: 2.7rem;
    }
  }

  .fade {
    &-enter-active, &-leave-active {
      transition: opacity .2s ease-in-out;
    }

    &-enter, &-leave-to{
      opacity: 0;
    } 
  }

  h4 {
    margin: 0
  }

</style>


