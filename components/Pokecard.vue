
<template>
  <div id="cards">
    <transition-group name="list-complete" tag="ul" >
      <li class="card list-complete-item"  v-for="poke in pokemons" v-bind:key="poke.name" >
        <div class="thumb"><img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`" /></div>
        <p class="name"><a :href=(poke.url)>{{ poke.name }}</a></p>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  //middleware: 'pokemon',
  computed: {
    ...mapState({
      pokemons: state => state.pokemons_tab,
    })
  },
  methods : {
	},
	mounted: function(){
    console.log(this.$store.pokemon);
    //this.$store.dispatch('getPoke');
  }
}
</script>
