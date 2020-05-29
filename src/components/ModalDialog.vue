<template>
  <transition name="fade">
    <div class="modal" @click="closeModal" v-if="showModal">
      <div class="modal-box" @click.stop>
        <div class="modal-header">
          <h3>Confirm</h3>
        </div>
        <div class="modal-body">
          Are you sure you want to perform this action?
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
  computed: {
    showModal() {
      return this.$store.getters.showModal;
    }
  },
  methods: {
    modalAction(action){
      this.$store.commit('setModalAction', action);
    },
    closeModal(){
      this.$store.commit('setShowModal', false);
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
    background: rgba(0, 0, 0, 0.72);
    display: grid;
    place-items: center;
    z-index: 2;
  
  &-box {
    background: #fff;
    width: 45rem;
    border-radius: 1px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.24);
    padding: 3rem;
    background-color: whitesmoke;
  }

  &-header{
    h3{
      font-size: 1.9rem;
      font-weight: 600;
      margin: 0;
      line-height: 1.2;
      position: relative;

       &::after{
        background-color: #536271;
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 8rem;
        height: 2px;
       }
    }
  }
  
  &-body{
    font-size: 1.7rem;
    margin: 3.3rem 0 3rem;
  }

  &-action-yes, &-action-no {
    font-weight: 500;
  }

  &-action-yes {
    background-color: #aaf397;;
    border: 1px solid #45c345;
    margin-right: .5rem;
    
    &:hover {
      transition: all .2s;
      background-color: #c4f7b7;
      border: 1px solid #91ce82;
    }
  }
  
  &-action-no {
    background-color: #f4aaaa;;
    border: 1px solid #fa6c6cb0;
    
    &:hover{
      transition: all .2s;
      background-color: #f7b7b7;
      border: 1px solid #f59090;
    }
  }

}
</style>
