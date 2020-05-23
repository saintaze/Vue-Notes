<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->
  <div id="app" class="container">
    <img src="./assets/logo.png" alt="vue logo" class="logo">
    <todo-list/>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

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
}

.container {
  max-width: 60rem;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 2rem auto;
  height: 7.5rem;
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
