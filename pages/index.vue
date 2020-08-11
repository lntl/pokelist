<template>
  <div class="container" :class="{onscroll:scrolled == true}">
      <div id="nav">
        <div id="logo">
          <img src="../assets/logo.svg"/>
        </div>
        <h1 class="title">PokeGroover</h1>
        <SearchForm />
        <Filters />
      </div>
      
      <div class="content">
        <Pokecards @clicked="toggleModal" />
      </div>
      <transition name="modal">
        <ModalPop v-if="modalDisplay" :toggle='toggleModal'/>
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
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
     ...mapState({
      pokemons: state => state.pokemons_tab,
    })
  },
  methods : {
    toggleModal(id){
      this.$store.dispatch('getOnce', id);
      this.modalDisplay =! this.modalDisplay;
    },
    handleScroll (event) {
      if(event.target.scrollingElement.scrollTop>40){
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
	},
	mounted: function(){
    this.$store.dispatch('getPoke');
  }
}
</script>

<style>

</style>
