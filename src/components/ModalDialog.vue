<template>
  <transition name="fade">
    <div class="modal" @click="closeModal" v-if="showModal">
      <div class="modal-box" @click.stop>
        <div class="modal-header">
          <h3>Are you Sure?</h3>
        </div>
        <div class="modal-body">
          I said hello to world not you
        </div>
        <div class="modal-footer">
          <button @click.stop="modalAction(true)" class="modal-action-yes">Yes</button>
          <button @click.stop="modalAction(false)" class="modal-action-no">No</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'modal-dialog',
  methods: {
    modalAction(action){
      this.$store.commit('setModalAction', action);
      this.closeModal()
    },
    closeModal(){
      this.$store.commit('setShowModal', false);
    }
  },
  computed: {
    showModal() {
      return this.$store.getters.showModal;
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
    background: rgba(0, 0, 0, 0.76);
    display: grid;
    place-items: center;
    z-index: 2;
    transition: opacity .3s ease;
  
  &-box {
    background: #fff;
    width: 45rem;
    border-radius: 1px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.24);
    transition: all .3s ease;
    padding: 2rem 3rem;
    background-color: aliceblue;
  }

  &-header{
    h3{
      font-size: 1.9rem;
      font-weight: 600;
    }
  }
  
  &-body{
    font-size: 1.7rem;
  }

  &-footer {
    margin: 2.6rem 0 1.5rem;
  }

  &-action-yes, &-action-no {
    font-weight: 500;
  }

  &-action-yes {
    background-color: #aaf397;;
    border: 1px solid #33ca33;
    margin-right: .5rem;
    
    &:hover {
      background-color: #c4f7b7;
      border: 1px solid #91ce82;
    }
  }
  
  &-action-no {
    background-color: #f39797;
    border: 1px solid #e84949b0;
    
    &:hover{
      transition: all .2s;
      background-color: #f7b7b7;
      border: 1px solid #f59090;
    }
  }

}
</style>
