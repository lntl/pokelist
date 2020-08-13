<template>
  <div class="container">
    <form id="formsort" >
			<input class="input-search" type="text" v-model="search" @input="searchForm" @change="searchForm" placeholder="Chercher un pokemon"/>
			<button class="search"></button>
		</form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "SearchForm",
  data() {
			return {
			search:"",
			inputData: String
		}
	},
	methods : {
		searchForm(e){
			e.preventDefault();
			let src = this.search;
			this.$store.commit('searchPoke', src);
		}
	},
};
</script>