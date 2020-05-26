import Vue from 'vue';
import VueRouter from 'vue-router';
import Notes from '../views/Notes.vue';
import NotesEdit from '../views/NotesEdit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/notes'
  },
  {
    path: '/notes',
    name: 'notes',
    component: Notes
  },
  {
    path: '/notes/:id/edit',
    name: 'notes-edit',
    component: NotesEdit,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
