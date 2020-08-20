<template>
<div id="nav-team"  v-bind:class="{click:onclick == true}">
  <div class="btn-toggle" v-on:click="handleClick()">
    Dreamteam <span class="sizebox">{{size}}</span>
  </div>
  <ul id="wrap-team">
    <li class="team-list" 
        v-for="pokemon in team" 
        v-bind:key="pokemon.name"
    >
    {{pokemon.name}}
    </li>
  </ul>
</div>

</template>
<script>
import { mapState } from "vuex";
export default {
  name: "SearchForm",
  data() {
		return {
      onclick:false,
      size:0,
		}
  },
  beforeUpdate(){
    this.size=this.team.length;
  },
  computed: {
    ...mapState({
      team: state => state.team,
    })
  },
	methods : {
    handleClick(){
      this.onclick= !this.onclick
    }
	},
};
</script>