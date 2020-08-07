import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const state = () => ({
    pokemons_tab:{},
    pagin:{},
});

export const mutations = {
    setPoke(state, data){
      state.pokemons_tab = data;
    },
    searchPoke(state, data){
      if(data!=""){
        let pokemons_tab = [...pokemons_tab];
        let newtab = state.pokemons_tab.filter(post => {
          return post.name.toLowerCase().includes(data);
        })
        this.commit('setPoke', newtab);
      } else {
        this.dispatch('getPoke');
      }
    },
    setPagin(state, data){
      state.pagin = data;
    },
}
export const actions = {
  getPoke({commit}){
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0').then(response => {
      
      response.data.results.map((elm,i)=>{
        let id = elm.url.split("/");
        response.data.results[i].id = id[6]
        return response.data.results[i].id;
      })
      commit('setPoke', response.data.results);
    }).catch(error => {
      console.log(error);
      this.errored = true;
    })
  },
}