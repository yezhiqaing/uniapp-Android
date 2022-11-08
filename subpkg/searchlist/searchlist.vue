<template>
	<view>
		
		<detai-list @incremet="incremet" :article="sarlist " />
	</view>
</template>

<script>
	export default {
		data() {
			return {
			val:"",
			sarlist:[],
			num:0,
			total: 0,
			curPage: 0,
			size: 0
			};
		},
		onLoad(res){
			
			this.val=res.val
			this.searlist()
		},
		onShow() {
		    // 退出后清除爱心 和登录显示爱心
			let cookie = uni.getStorageSync("cookie")
			if (!cookie) {
				this.sarlist.forEach(item => {
					if (item.collect == true) {
						item.num = 0
						item.collect = !item.collect
					}
				})
			} else {
				this.sarlist.forEach(item => {
					if (item.num == 0) {
						item.collect = true
					}
				})
			}
		
		
		},
		methods:{
		
			// 前台收藏控制
			incremet(index, isok, id) {
				if (isok == true) {
					this.sarlist[index].collect = true
				}
				if (isok == false) {
					this.sarlist[index].collect = false
					console.log(id)
				}
			
			},
			// 发起搜索请求
		  async	searlist(){
			  
				let searlist=await this.$request({url:`/article/query/${this.num}/json?k=${this.val}`,method:"POST"})
				console.log(searlist)
				searlist.data.datas.forEach(item=>{
					item.title=item.title.replace(/<[^>]+>/g, '')
				})
				this.sarlist=[...this.sarlist,...searlist.data.datas]
				let {
					total,
					curPage,
					size
				} = searlist.data
				this.total = total
				this.curPage = curPage
				this.size = size
			},
			onReachBottom() {
				if (this.curPage * this.size >= this.total) {
					uni.showToast({
						title: '已经没有数据',
						duration: 2000
					});
					return
				}
				this.num++
				this.searlist()
			},
		}
	}
</script>

<style lang="scss">

</style>
