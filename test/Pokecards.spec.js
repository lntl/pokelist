import Vuex from "vuex"
import { createLocalVue, mount } from "@vue/test-utils"
import Filters from "@/components/Filters.vue"

const localVue = createLocalVue()
localVue.use(Vuex)

const mutations = {
  testMutation: jest.fn()
}

const store = new Vuex.Store({ mutations })

describe("Filters", () => {

  it("commits a mutation when a fliters is clicked", async () => {
    const wrapper = mount(Filters, {
      store, localVue
    })
    let filter_type = {
      target: "",
      order_alpha:1,
      order_num:0,
    };
    wrapper.find(".alpha").trigger("click")
    await wrapper.vm.$nextTick()    
    
    expect(mutations.testMutation).toHaveBeenCalledWith('setFilters', filter_type)
  })

})