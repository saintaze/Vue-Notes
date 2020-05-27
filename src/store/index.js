import Vue from 'vue';
import Vuex from 'vuex';

import {Todo, Note} from '@/models';
import {getData, setData} from '@/helpers';

const APP_NAME = 'vue-notes';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    selectedNoteIndex: null,
    selectedTodoMode: 'all',
    notes: getData(APP_NAME)
  },
  getters: {
    selectedNoteIndex(state){
      return state.selectedNoteIndex;
    },
    selectedTodoMode(state) {
      return state.selectedTodoMode;
    },
    notes(state){
      return state.notes;
    },
    note: (state) => (index) => {
      return state.notes[index];
    },
    todosFiltered: (state) => (index) => {
      if (state.selectedTodoMode === 'active') {
        return state.notes[index].todos.filter(t => !t.completed);
      } else if (state.selectedTodoMode === 'completed') {
        return state.notes[index].todos.filter(t => t.completed);
      } else {
        return state.notes[index].todos;
      }
    },
    remainingTodos: (state) => (index) => {
      return state.notes[index].todos.filter(t => !t.completed).length;
    },
    noRemainingTodos: (state) => (index) => {
      return state.notes[index].todos.every(t => t.completed);
    },
    showClearCompletedButton: (state) => (index) => {
      return state.notes[index].todos.filter(t => t.completed).length > 0;
    }
  },
  mutations: {
    addNote(state, newNoteName) {
      if (!newNoteName.trim().length) return;
      state.notes.unshift(new Note(newNoteName));
      state.selectedNoteIndex = 0;
      setData(APP_NAME, state.notes);
    }, 
    removeNote(state, index) {      
      state.notes.splice(index, 1);
      if(state.selectedNoteIndex === index) {
        state.selectedNoteIndex = null;
      }else if(state.selectedNoteIndex > index){
        state.selectedNoteIndex--;
      }
      setData(APP_NAME, state.notes);
    },
    editNoteName(state, {index, name}){
      state.notes[index].name = name;
      setData(APP_NAME, state.notes);
    },
    setSelectedNote(state, index) {
      state.selectedNoteIndex = index;
    },
    addTodo(state, newTodoTitle) {
      if (!newTodoTitle.trim().length) return;
      const newTodo = new Todo(newTodoTitle);
      state.notes[state.selectedNoteIndex].todos.unshift(newTodo);
      setData(APP_NAME, state.notes);
    },
    removeTodo(state, { noteIndex, todoIndex }) {
      state.notes[noteIndex].todos.splice(todoIndex, 1);
      setData(APP_NAME, state.notes);
    },
    editTodo(state, { noteIndex, todoIndex, todo }) {
      Vue.set(state.notes[noteIndex].todos, todoIndex, todo);
      setData(APP_NAME, state.notes);
    },
    setSelectedTodoMode(state, mode){
      state.selectedTodoMode = mode;
    },
    clearCompletedTodos(state, index){
      state.notes[index].todos = state.notes[index].todos.filter(t => !t.completed);
      setData(APP_NAME, state.notes);
    },
    toggleCheckAllTodos(state, {index, checked}) {
      state.notes[index].todos = state.notes[index].todos.map(t => ({...t, completed: checked }));
      setData(APP_NAME, state.notes);
    }
  }
});