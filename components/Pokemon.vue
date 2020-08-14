
<template>
  <div id="landing">
    <div class="thumb">
      <img v-if="pokemon.id!='undefined'" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
    </div>
    <div class="catch" @click="handleClick" v-if="!isInTeam" :class="{isIn:isInTeam == true}"><img src="../assets/PkBall.svg" /></div>
    <div v-else  class="catch" @click="handleClick">Delete</div>
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
      isInTeam:false,
    }
  },
  computed: {
    ...mapState({
      pokemon: state => state.pokemon,
      team: state => state.team,
    })
  },
  methods: {
    handleClick(){
      var erz = false;
      for(var val in this.team){
        if(this.pokemon.id===this.team[val].id){
          erz=true;
        }
      }
      if(!erz){
        this.pokemon.action = "added";
        this.$store.dispatch('getTeam', this.pokemon)
        this.isInTeam=false;
      } else {
        this.pokemon.action = "trash";
        this.$store.dispatch('getTeam', this.pokemon)
        this.isInTeam=true;
      }

      console.log(this.team)
    }
  }
  
}
</script>
