
<template>
  <div id="cards">
    <transition-group name="list-complete" tag="ul" >
      <li class="card list-complete-item" 
          v-for="poke in pokemons" 
          v-bind:key="poke.name"
          v-on:click="selectCads(poke.id)" 
      >
      <span class="ids">{{poke.id}}</span>
        <div class="thumb">
          <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`" />
        </div>
        <p class="name">
          {{ poke.name.charAt(0).toUpperCase() + poke.name.slice(1) }}
        </p>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ...this.$store.state
    }
  },
  name: "Pokecards",
  computed: {
    ...mapState({
      pokemons: state => state.pokemons_tab,
    })
  },
  methods : {
    selectCads(id){
      this.$emit('clicked', id);
    }
	}
}
</script>
