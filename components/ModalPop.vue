<template>
  <div class="modal-mask">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-on-clickaway="away">
          <div class="btn-close"  @click="away">X</div>
          <Pokemon />
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
  data(){
    return{
      id:undefined,
      datas:{}
    }
  },
  props: {
    toggle: Function
  },
  methods: {
    away() {
      this.$store.dispatch('getOnce', "");
      this.toggle();
    }
  }
}
</script>