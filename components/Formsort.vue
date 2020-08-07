<template>
  <div class="container">
    <form id="formsort" >
			<input type="text" v-model="search" @input="searchForm" @change="searchForm" placeholder="Chercher un pokemon"/>
			<button class="search"></button>
		</form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Formsort",
  props: {
    inputData: String
	},
	methods : {
		searchForm: function(e){
			e.preventDefault();
			console.log(this.search);
			this.$store.commit('searchPoke', this.search);
		}
	},
};
</script>