<template>
  <div class="container">
      <Logo />
      <h1 class="title">PokeGroover</h1>
      <Formsort />
      <Filters />
      <div class="content">
        <Pokecard />
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware: 'pokemon',
  computed: {
     ...mapState({
      pokemons: state => state.pokemons_tab,
    })
  },
  methods : {
	},
	mounted: function(){
    this.$store.dispatch('getPoke');
  }
}
</script>

<style>

</style>
