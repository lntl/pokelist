import axios from 'axios'

export default function ({ store, redirect }) {
  if (!process.server) {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=25&offset=0').then(response => {
      response.data.results.map((elm,i)=>{
        let id = elm.url.split("/");
        response.data.results[i].id = id[6]
        return response.data.results[i].id;
      })
      store.commit('setPoke', response.data.results);
      console.log("middleware from client side");
      return true;
    }).catch(error => {
      console.log(error)
      this.errored = true
    })
  } else {
    console.log("Passer nuxt.config en mode SPA pour le coté client");
  }
}
