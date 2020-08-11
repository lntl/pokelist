import Vuex from 'vuex'
import Vue from 'vue'
import {mount, createLocalVue} from '@vue/test-utils'

import Pokecards from '../components/Pokecards'
import PokeStore from '../store/index'

const vueWithVuex = createLocalVue()
vueWithVuex.use(Vuex);
const store = new Vuex.Store(PokeStore);

test('store load', ()=>{
  const wrapper = mount(Pokecards, {
    localVue:vueWithVuex,
    store
  })
  console.log(wrapper.vm.getPoke());
  //expect(wrapper.vm.getPoke())
})