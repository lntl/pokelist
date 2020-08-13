import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
export const state = () => ({
    pokemons_tab:[],
    pokemon:[],
    last_filter:"",
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
    setOnce(state,data){
      state.pokemon = data;
    },
    setFilters(state,data){
      let pokemons_tab = [...state.pokemons_tab];
      !state.last_filter ? state.last_filter=data.target : null;

      function sortByKey(key, order) {
        if(order==="asc"){
          return function(a,b){
            if(key==='id'){a[key] = parseFloat(a[key]); b[key] = parseFloat(b[key]);}
           if (a[key] > b[key]) return 1;
           if (a[key] < b[key]) return -1;
           return 0;
          }
        } else if(order==="desc"){
          return function(a,b){
            if(key==='id'){a[key] = parseFloat(a[key]); b[key] = parseFloat(b[key]);}
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
           }
        }
      }
      let order_by = (data.order_by=="0") ? 'asc' : 'desc';
      let target="";
      switch(data.target) {
        case "order_alpha":
          target = 'name';
        break;
        case "order_num":
          target = 'id';
        break;
      }
      pokemons_tab.sort(sortByKey(target, order_by));
      
      console.log("Last Target = "+state.last_filter+'  ||  '+"Current target = "+data.target);

      this.commit('setPoke', pokemons_tab);

      state.last_filter!=data.target ? state.last_filter=data.target : null;
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
  getOnce({commit},id){
    let url = "https://pokeapi.co/api/v2/pokemon/"+id;
    return new Promise((resolve, reject) => {
      if(id){
        axios.get(url).then(response => {
            response.data.name = response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1);
            commit('setOnce', response.data);
            resolve(response);
          }).catch(error => {
            console.log(error);
            this.errored = true;
          })
      } else {
        commit('setOnce', "");
        resolve('ok');
      }
    })
  }
}