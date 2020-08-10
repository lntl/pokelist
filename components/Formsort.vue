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
  data: function () {
			return {
			search:"",
			inputData: String
		}
	},
	methods : {
		searchForm: function(e){
			e.preventDefault();
			let src = this.search;
			console.log(this.search);
			this.$store.commit('searchPoke', src);
		}
	},
};
</script>