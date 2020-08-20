<template>
  <div class="container" :class="{onscroll:scrolled == true}">
      <div id="nav">
      
        <div id="logo">
          <img src="../assets/logo.svg"/>
        </div>
        <h1 class="title">PokeGroover<span class="sub-title">search them all</span></h1>
        <SearchForm />
        <Filters />
      </div>
      <Team />
      <div class="content">
        <Pokecards @clicked="toggleModal" />
      </div>
      <div v-if="loader" class="loader-wrap">
        <img src="../assets/PkBall.svg" class="loader"/>
      </div>
      <transition name="modal">
        <ModalPop v-if="modalDisplay" :toggle='toggleModal' @handleToggledTeam='toggledTeam' />
      </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware: 'pokemon',
  data(){
    return{
      modalDisplay:false,
      scrolled:false,
      loader:false,
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods : {
    toggleModal(data){
      if(data){
        this.loader=true;
        this.$store.dispatch('getOnce', data).then(()=>{
          this.modalDisplay =! this.modalDisplay;
          this.loader=false;
        });
      } else {
        this.modalDisplay = false
      }
    },
    async toggledTeam(data){
      await this.$store.dispatch('getListBindByTeam', data);
      if(data.action!='trash'){
        setTimeout(()=>{
          this.toggleModal();
        }, 1300)
      } else {
        this.toggleModal();
      }
      
    },
    handleScroll(event) {
      if(event.target.scrollingElement.scrollTop>40){
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
	},
	mounted(){
    this.$store.dispatch('getPoke');
  }
}
</script>

<style>

</style>
