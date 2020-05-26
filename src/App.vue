<template>
  <div id="app" class="container">
    <div id="nav">
      <button><router-link to="/notes">Notes</router-link></button> |
      <button><router-link to="/notes/:id/edit">Notes Edit</router-link></button> 
    </div>
    <img src="./assets/logo.png" alt="vue logo" class="logo">
    <router-view/>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'

export default {
  name: 'app',
  components: {
    TodoList
  }
}
</script>

<style lang="scss">

// Montserrat Font
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');


* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: 'Montserrat', sans-serif;
  color: #2c3e50;;
  line-height: 1.6;
  font-weight: normal;
  font-size: 1.8rem;
  padding-bottom: 4rem;
}

.container {
  max-width: 60rem;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 4rem auto;
  height: 7.5rem;
  cursor: pointer;

  &:hover{
    transition: all .5s ease;
    transform: scale(1.1);
  }
}

button {
  cursor: pointer;
  font-family: inherit;
  color: inherit;
  font-size: 1.4rem;
  background-color: white;
  padding: 0.3rem 1.5rem;
  border: 1px solid lightgrey;

  &:hover {
    transition: all .2s;
    background-color: #d4ebd0;
    border: 1px solid #7dc97d;
  }

  &:not(:first-child){
    margin-left: .7rem;
  }

  &:focus {
    outline: none;
  }
}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
