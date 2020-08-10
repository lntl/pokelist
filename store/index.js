import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const state = () => ({
    pokemons_tab:[],
    filters:[],
});

export const mutations = {
    setPoke(state, data){
      state.pokemons_tab = data;
    },
    searchPoke(state, data){
      if(data!=""){
        let pokemons_tab = [...state.pokemons_tab];
        let newtab = pokemons_tab.filter(post => {
          return post.name.toLowerCase().includes(data);
        })
        this.commit('setPoke', newtab);
      } else {
        this.dispatch('getPoke');
      }
    },
    setFilters(state,data){
      let pokemons_tab = [...state.pokemons_tab];
      var newtab;
      function sortByKey(key, order) {
        if(order==="asc"){
          return function(a,b){
           if (a[key] > b[key]) return 1;
           if (a[key] < b[key]) return -1;
           return 0;
          }
        } else {
          return function(a,b){
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
           }
        }
      }
      //order_name 0=ASC 1=DESC
      let tgt = "";
      switch(data.target) {
        case "order_sort":
          tgt="id"
        break;
        case "order_name":
          tgt="name"
        break;
      }
      if(data.order_name==="0") {
        newtab = pokemons_tab.sort(sortByKey(tgt, 'asc')) 
      } else { 
        newtab = pokemons_tab.sort(sortByKey(tgt,'desc'));
      }
      this.commit('setPoke', newtab);
    }
}
export const actions = {
  getPoke({commit}){
    if(!localStorage.pokemons) {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0').then(response => {
        response.data.results.map((elm,i)=>{
          let id = elm.url.split("/");
          response.data.results[i].id = id[6]
          localStorage.pokemons = JSON.stringify(response.data.results);
          return response.data.results[i].id;
        })
        commit('setPoke', response.data.results);
      }).catch(error => {
        console.log(error);
        this.errored = true;
      })
    } else {
      commit('setPoke', JSON.parse(localStorage.pokemons));
    };
  },
}