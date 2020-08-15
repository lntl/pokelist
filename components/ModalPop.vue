<template>
  <div class="modal-mask">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-on-clickaway="away">
          <div class="btn-close"  @click="away">X</div>
          <Pokemon @handleToggledTeam='toggledTeam'/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  name: 'ModalPop',
  props: {
    toggle: Function
  },
  methods: {
    away(){
      this.toggle();
    },
    toggledTeam(data){
      this.$emit('handleToggledTeam', data);
    },
  }
}
</script>