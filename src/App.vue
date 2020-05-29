<template>
  <div id="app" class="container">
    <modal-dialog />
    <div class="nav">
       <router-link to="/notes"><button>Notes</button></router-link>
       <img src="./assets/logo.png" alt="Vue Logo" class="logo">
    </div>
    <router-view/>
  </div>
</template>

<script>
import ModalDialog from '@/components/ModalDialog';

export default {
  name: 'app',
  components: {
    ModalDialog
  }
}
</script>

<style lang="scss">
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
  padding: 0 1rem 4.5rem;
}

.container {
  max-width: 60rem;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 0 auto;
  height: 7.5rem;
  cursor: pointer;
  transition: all .5s ease;

  &:hover{
    transform: scale(1.2);
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
    background-color: #d4ebd0c7;
    border: 1px solid #99da99;
  }

  &:not(:first-child){
    margin-left: .7rem;
  }

  &:focus {
    outline: none;
  }
}

.active {
  transition: all .3s;
  background-color: #41b883;
  border: 1px solid #20b2aab0;
  color: white !important;

  &:hover {
    background-color: #41b883;
  }
}

.nav {
  display: flex;
  margin: 4rem 0;
  justify-content: space-between;
  position: relative;

  button {
    font-weight: 500;
    color: #2c3e50;

    &:hover {
      transition: all .3s;
      color : white;
      background-color: rgb(23, 161, 161);
      border: 1px solid rgb(23, 161, 161);
    }
  }

  a {
    position: absolute;
    top: 2px;
    left: 0;
  }

  .router-link-exact-active button {
    transition: all .3s;
    background-color: teal;
    border: 1px solid rgb(23, 161, 161);
    color: white !important;

    &:hover {
      background-color: rgb(23, 161, 161);
    }
  }
}

  @media screen and (max-width: 1100px){
    html {
      font-size: 60%;
    }
  }

  @media screen and (max-width: 900px){
    html {
      font-size: 59%;
    }
  }

  @media screen and (max-width: 700px){
    html {
      font-size: 56%;
    }
  }

  @media screen and (max-width: 500px){
    html {
      font-size: 53%;
    }
  }
</style>
