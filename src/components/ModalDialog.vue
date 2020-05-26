<template>
  <transition name="fade">
    <div class="modal" @click="showModalDialog = false" v-if="showModalDialog">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Hello World</h3>
        </div>
        <div class="modal-body">
          I said hello to world not you
        </div>
        <div class="modal-footer">
          <button @click="modalAction(true)" class="modal-action-yes">Yes</button>
          <button @click="modalAction(false)" class="modal-action-no">No</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { dispatchEvent } from '@/helpers';

export default {
  name: 'modal-dialog',
  props: {
    showModal: Boolean
  },
  data(){
    return {
      showModalDialog: this.showModal 
    }
  },
  methods: {
    modalAction(action){
      this.showModalDialog = false;
      dispatchEvent('modalAction', action);
    }
  }
}
</script>

<style lang="scss">

 .modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: grid;
    place-items: center;
    transition: opacity .3s ease;
  
  &-box {
    background: #fff;
    width: 45rem;
    border-radius: 1px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    padding: 2rem 3rem;
  }
  
  &-footer {
    margin: 2rem 0 1.5rem;
  }

  &-action-yes {
    background-color: #cceabb;
    border: 1px solid #20b2aab0;
    margin-right: .5rem;
  }
  
  &-action-no {
    background-color: #ecc2c2;
    border: 1px solid #b26a20b0;
    
    &:hover{
      transition: all .2s;
      background-color: #ebd0d0;
      border: 1px solid #c97d7d;
    }
  }

}
</style>
