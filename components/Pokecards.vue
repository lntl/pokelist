
<template>
  <div id="cards">
    <transition-group name="list-complete" tag="ul" >
      <li class="card list-complete-item" 
          v-for="poke in pokemons" 
          v-bind:key="poke.name"
          v-on:click="selectCads(poke)" 
      >
      <span class="ids">{{poke.id}}</span>
      <div v-if="poke.inteam" class="catch">Catched</div>
        <div class="thumb">
          <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`" />
        </div>
        <p class="name">
          {{ poke.name.charAt(0).toUpperCase() + poke.name.slice(1) }}
        </p>
         <div class="types">
          <div v-for="type in poke.types" v-bind:key="type.name" >
            <span v-for="tpe in type"  v-bind:key="tpe.name">{{tpe.name}}</span>
          </div>
        </div>
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
    selectCads(poke){
      this.$emit('clicked', poke);
    }
	}
}
</script>
