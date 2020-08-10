<template>
  <div class="container" id="filters">
      <div class="title">
        Filters
      </div>
      <div class="order-name">
        <div class="title">Ordre alphabétique</div>
        <label @click="isActive = 1" :class="{active:isActive == 1}" class="container-field">
          ASC
          <input type="radio" name="order_name" v-model="order" @change="handleFilter" :value="0"/>
          <span class="checkmark"></span>
        </label>
        <label @click="isActive = 2" :class="{active:isActive == 2}" class="container-field">
          DESQ
          <input type="radio" name="order_name" v-model="order" @change="handleFilter" :value="1"/>
          <span class="checkmark"></span>
        </label>
      </div>
      <!-- <div class="order-name">
        <div class="title">Ordre numérique</div>
        <label @click="isActivenum = 3" :class="{active:isActivenum == 3}" class="container-field">
          ASC
          <input type="radio" name="order_sort" v-model="sort" @change="handleFilter" :value="0"/>
          <span class="checkmark"></span>
        </label>
        <label @click="isActivenum = 4" :class="{active:isActivenum == 4}" class="container-field">
          DESQ
          <input type="radio" name="order_sort" v-model="sort" @change="handleFilter" :value="1"/>
          <span class="checkmark"></span>
        </label>
      </div> -->
      
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Filters",
  data: function () {
    return {
      filter_type: {
        id:String,
        order_name:String,
        order_sort:Array
      },
      sort:undefined,
      order:undefined,
      isActive: undefined,
      isActivenum:undefined
    }
	},
	methods : {
		handleFilter: function(e){
      let field_name = e.target.name;
      this.$data.filter_type.target = field_name;
      switch(e.target.name){
        case "id":
          this.$data.filter_type.id  = e.target.value;
        break;
        case "order_name":
          this.$data.filter_type.order_name = e.target.value;
        break;
        case "order_sort":
          this.$data.filter_type.order_sort  = e.target.value;
        break;
      }
      this.$store.commit('setFilters', this.$data.filter_type);
		}
	},
};
</script>