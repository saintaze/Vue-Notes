import Vue from 'vue';
import Vuex from 'vuex';

import {Todo, Note} from '@/models';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    selectedIndex: null,
    notes: [
      {
        name: 'Groceries',
        todos: [
          { title: 'buy mangoes', completed: false, editing: false },
          { title: 'get red chilli powder', completed: false, editing: false },
          { title: '3 breads 2 apples 8 oranges', completed: false, editing: false }
        ]
      },
      {
        name: 'Boxing',
        todos: [
          { title: 'train for boxing', completed: false, editing: false },
          { title: 'strengthen muscles in the arms', completed: false, editing: false },
          { title: 'climb 3 flights fo stairs', completed: false, editing: false }, { title: 'strengthen muscles in the armswj jejwj jewje jewjejw ejwjewj ejwekjwj', completed: false, editing: false },
          { title: 'climb 3 flights fo stairs', completed: false, editing: false },
          { title: 'strengthen muscles in the arms', completed: false, editing: false },
        ]
      }
    ]
  },
  getters: {
    selectedIndex(state){
      return state.selectedIndex;
    },
    notes(state){
      return state.notes;
    }
  },
  mutations: {
    removeNote(state, index) {
      if (state.selectedIndex === index) state.selectedIndex = null;
      state.notes.splice(index, 1);
    },
    addNote(state, newNoteName) {
      if (!newNoteName.trim().length) return;
      state.notes.unshift(new Note(newNoteName));
      state.selectedIndex = 0;
    },
    addTodo(state, newTodoTitle) {
      if (!newTodoTitle.trim().length) return;
      const newTodo = new Todo(newTodoTitle);
      state.notes[state.selectedIndex].todos.unshift(newTodo);
    },
    selectedNote(state, index) {
      state.selectedIndex = index;
    }
  }
});