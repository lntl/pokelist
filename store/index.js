import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
export const state = () => ({
    pokemons_tab:[],
    pokemon:[],
    team:[],
    last_filter:"",
});

export const mutations = {
    setPoke(state, data){
      state.pokemons_tab = data;
    },
    setList(state, data){
      let pokemons_tab = [...state.pokemons_tab];
      pokemons_tab.map((pokemon, indx)=>{
        pokemon.types.map((elm)=>{
          let find = data.find(filters => filters === elm.type.name)
          if(find){
            if(pokemon.types.length>1){
              pokemons_tab[indx].score += 1
            } else {
              pokemons_tab[indx].score = 1
            }
          } else if(!find && !pokemons_tab[indx].score) {
            pokemons_tab[indx].score = 0
          } else {
            pokemons_tab[indx].score = 0
          }
        })
      })
      function sortByKey(key) {
        return function(a,b){
          a[key] = parseFloat(a[key]); b[key] = parseFloat(b[key]);
          if (a[key] > b[key]) return -1;
          if (a[key] < b[key]) return 1;
          return 0;
        }
      }
      pokemons_tab.sort(sortByKey("score"));
      this.commit('setPoke', pokemons_tab);
    },
    setListByTeam(state, id){
      let pokemons_tab = [...state.pokemons_tab];
      var newarr = pokemons_tab.map((elm)=>{
        if(elm.id == id){
          if(elm.inteam!=true) {
            elm.inteam=true
          }else {
            elm.inteam=false
          } 
        }
        return elm
      })
      state.pokemons_tab = newarr;
    },
    setTeam(state, data){
      let team = [...state.team];
      if(data.action){
        if(data.action!="trash"){
          team.push(data);
        } else {
          team.forEach((elm, indx) => {
            if(elm.id===data.id){
              team.splice(indx,1);
            }
            if(team.length==1){
              team=[];
            }
          })
        }
      }
      state.team = team;
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

      this.commit('setPoke', pokemons_tab);

      state.last_filter!=data.target ? state.last_filter=data.target : null;
    }
}
export const actions = {
  getPoke({commit}){
    if(!localStorage.pokemons) {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0').then(response => {
          return new Promise((resolve, reject) => {
            response.data.results.map((elm,i)=>{
              let id = elm.url.split("/");
              response.data.results[i].id = id[6];
              fetch(elm.url).then(rsp => rsp.json()).then(function(pokeData){
                return response.data.results[i].types=pokeData.types
              })
            })
            setTimeout(()=>{
              localStorage.pokemons = JSON.stringify(response.data.results);
              resolve(commit('setPoke', response.data.results))
            },3000)
         
          }) 
        }).catch(error => {
          console.log(error);
          this.errored = true;
        })
    } else {
      commit('setPoke', JSON.parse(localStorage.pokemons));
    };
  },
  getListBindByTeam({commit}, data){
    commit('setListByTeam', data.id);
  },
  getOnce({commit},data){
    let url = "https://pokeapi.co/api/v2/pokemon/"+data.id;
    return new Promise((resolve, reject) => {
      if(data.id){
        axios.get(url).then(response => {
            response.data.inteam=data.inteam;
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
  },
  getReorder({commit}, data){
    commit('setList', data);
  },
  getTeam({commit}, data){
    commit('setTeam', data);
  }
}