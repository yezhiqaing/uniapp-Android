<template>
	<view class="tidebox">

		<v-tabs fixed bgColor="#dd544e" v-model="current" :tabs="tabs" @change="Sallgo"></v-tabs>
		<detai-list @incremet="incremet" :article="deillist" />



	</view>

</template>

<script>
	export default {
		data() {
			return {

				// 传过来的tab导航数据
				tablis: [],
				// 文章数据
				deillist: [],
				num: 0,
				total: 0,
				curPage: 0,
				size: 0,
				id: 0,
				items: [],
				current: 0,
				tabs: []

			};
		},
		onLoad(a) {
			// 设置动态导航栏名字
			uni.setNavigationBarTitle({
				title: a.name
			});
			this.current = a.active
			let formObj = decodeURIComponent(a.item)
			this.tablis = JSON.parse(formObj)
			// 循环数组拿到name给tab
			this.tabs = this.tablis.map(item => {
				return item.name
			})
			// 页面加载赋值调用
			this.id = a.ids
			this.Getwenz()



		},
		methods: {
		// 收藏
		incremet(index,isok){
			if(isok==true){
				this.deillist[index].collect=true
			}
			if(isok==false){
				this.deillist[index].collect=false
			}
			
		},

			// tab栏切换调用
			Sallgo(index) {
				this.current = index
				this.id = this.tablis[index].id
				if (this.id !== index) {
					this.deillist = []
				}
				this.Getwenz()


			},
			// 获取数据
			async Getwenz() {

				let res = await this.$request({
					url: `/article/list/${this.num}/json?cid=${this.id}&page_size=10`,
					method: "GET"
				})
				console.log(res)
				// this.deillist=res.data.datas
				this.deillist = [...this.deillist, ...res.data.datas]
				let {
					total,
					curPage,
					size
				} = res.data

				this.total = total
				this.curPage = curPage
				this.size = size
			},
			// 上拉刷新判断是否还有下一页和在发起下一页请求
			onReachBottom() {

				if (this.curPage * this.size >= this.total) {
					uni.showToast({
						title: '已经没有数据',
						duration: 2000
					});
					return
				}
				this.num++
				this.Getwenz()
			}
		}
	}
</script>

<style lang="scss">
	page {

		height: 100%;
	}

	.tidebox {
		height: 100%;



		// // background-color: #bfa;
		// white-space: nowrap;
		// width: 100%;
		// uni-segmented-control{
		// 	background-color: #dd544e;
		// 	white-space: nowrap;
		// 	width: 100%;
		// }

		// .scollitem {
		// 	height: 100%;
		// 	padding: 20rpx 0;

		// 	text {

		// 		height: 100%;
		// 		margin-right: 20rpx;
		// 		color: #f6f6f6;
		// 		font-size: 29rpx;
		// 		margin-left: 10rpx;

		// 	}
		// }
	}
</style>
