<template>
	<view>
		 <web-view  :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				url:"",
		
			};
		},
		onLoad(a){
			this.url=a.url
		
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">

</style>
