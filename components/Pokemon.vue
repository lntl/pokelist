
<template>
  <div id="landing">
    <div class="thumb">
      <img v-if="pokemon.id!='undefined'" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
    </div>
    <div class="catch" @click="handleClick" v-if="!isClicked">
      <img src="../assets/PkBall.svg" />
      <span class="btn-catch">Clic sur la pokeball</span>
    </div>
    <div v-if="isClicked"  class="catch">
      <div class="catched">Catched !!</div>
      <div class="catch remove" @click="handleClick" v-if="isClicked" >
        remove
      </div>
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
  data(){
    return{
      isClicked : false
    }
  },
  mounted: function () {
    this.isClicked = this.pokemon.inteam
  },
  computed: {
    ...mapState({
      pokemon: state => state.pokemon,
    })
  },
  methods: {
    async handleClick(){
      this.isClicked = this.pokemon.inteam
      
      if(!this.pokemon.inteam){
        this.isClicked=true;
        this.pokemon.action = "added";
        this.$store.dispatch('getTeam', this.pokemon)
      } else {
        this.isClicked=true;
        this.pokemon.action = "trash";
        this.$store.dispatch('getTeam', this.pokemon)
      }

      this.$emit('handleToggledTeam', this.pokemon);
    }
  }
  
}
</script>
