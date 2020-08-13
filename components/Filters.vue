<template>
  <div class="container" id="filters">
      <div class="filter-blocs">
        <div class="order-name">
          <div class="title">Ordre alphabétique</div>
          <label @click="isActive = 1" :class="{active:isActive == 1}" class="container-field">
            ASC
            <input type="radio" name="order_alpha" v-model="alpha" @change="handleFilter" :value="0"/>
            <span class="checkmark"></span>
          </label>
          <label @click="isActive = 2" :class="{active:isActive == 2}" class="container-field">
            DESQ
            <input type="radio" name="order_alpha" v-model="alpha" @change="handleFilter" :value="1"/>
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="bar"></div>
        <div class="order-name">
          <div class="title">Ordre numérique</div>
          <label @click="isActiveNum = 1" :class="{active:isActiveNum == 1}" class="container-field">
            ASC
            <input type="radio" name="order_num" v-model="num" @change="handleFilter" :value="0"/>
            <span class="checkmark"></span>
          </label>
          <label @click="isActiveNum = 2" :class="{active:isActiveNum == 2}" class="container-field">
            DESQ
            <input type="radio" name="order_num" v-model="num" @change="handleFilter" :value="1"/>
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Filters",
  data() {
    return {
      filter_type: [{
        order_alpha:"",
        order_num:"",
      }],
      num:undefined,
      alpha:undefined,
      isActive: undefined,
      isActiveNum:undefined
    }
	},
	methods : {
		handleFilter: function(e){
      let field_name = e.target.name;
      this.$data.filter_type.target = field_name;
      this.$data.filter_type.order_by = e.target.value;
      switch(field_name){
        case "order_alpha":
          this.$data.filter_type.order_alpha = this.alpha;
        break;
        case "order_num":
          this.$data.filter_type.order_num  = this.num;
        break;
      }
      this.$store.commit('setFilters', this.$data.filter_type);
		}
	},
};
</script>