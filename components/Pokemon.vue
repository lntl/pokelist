
<template>
  <div id="landing">
    <div class="thumb">
      <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
    </div>
    <div id="pin">
      <div class="name">{{ pokemon.name }}</div>
      <div class="pv"  
        v-for="stat in pokemon.stats" 
        v-bind:key="stat.id" 
      > 
        <div v-if="stat.stat.name=='hp'" class="hp">
          {{stat.base_stat}} Hp
        </div>
      </div>
      <div class="infos">
        <div class="weigth">
          {{pokemon.weight}} Kg
        </div>
        <div class="types">
          <div v-for="type in pokemon.types" v-bind:key="type.name" >
            <span v-for="tpe in type"  v-bind:key="tpe.name">{{tpe.name}}</span>
          </div>
        </div>
        <div class="size">
          {{pokemon.height}}'
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Pokemon",
  computed: {
    ...mapState({
      pokemon: state => state.pokemon,
    })
  },
  
}
</script>
