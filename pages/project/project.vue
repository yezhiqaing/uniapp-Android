<template>
	<view>
		<!-- 分类区域 -->
		<v-tabs fixed v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>

		<!-- 列表区域 -->
		<view class="xin_list">
			<view @click="gotodeail(item.link)" v-for="item in xianglist" :key="item.id" class="xin_item">
				<view class="img">
					<image :src="item.envelopePic" mode=""></image>

				</view>
				<view class="titleright">
					<view class="title">{{item.title}}</view>
					<view class="count">{{item.desc}}</view>
					<view class="titbotton">
						<view>stewForAni</view>
						<view>开源项目主Tab/完整项目</view>
						<view>2022-05-03 21:07</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [],
				// 分类数据
				xiangmu: [],
				// 列表数据
				xianglist: [],
				total: 0,
				curPage: 0,
				size: 0,
				num: 1
			}
		},
		async onLoad() {
			this.Getxianfen()
		},
		// 之前选择的位置 页面隐藏后为最初位置
		onHide() {
			this.current = 0
		},
		methods: {

			// 分类数据请求
			async Getxianfen() {
				let res = await this.$request({
					url: "/project/tree/json",
					method: "GET"
				})
				this.xiangmu = res.data
				// 循环数据的name给tab数组
				this.tabs = res.data.map(item => {
					return item.name
				})
				// 默认页面显示就调用一次第一个
				this.Listbox(0)

			},
			// tab切换触发
			async changeTab(index) {
				this.xianglist = []
				this.current = index
				this.Listbox(index)
				// 	let id= this.xiangmu[index].id
				// let reslist=await this.$request({url:`/project/list/1/json?cid=${id}`,method:"GET",data:{page_size :10}})
				//      this.xianglist=reslist.data.datas

			},
			async Listbox(index) {
				let id = this.xiangmu[index].id
				let reslist = await this.$request({
					url: `/project/list/${this.num}/json?cid=${id}`,
					method: "GET",
					data: {
						page_size: 10
					}
				})
				this.xianglist = [...this.xianglist, ...reslist.data.datas]
				let {
					total,
					curPage,
					size
				} = reslist.data

				this.total = total
				this.curPage = curPage
				this.size = size
				console.log(reslist)
			},
			// 上拉加载
			onReachBottom() {
				console.log('aa')
				if (this.curPage * this.size >= this.total) {
					uni.showToast({
						title: '已经没有数据',
						duration: 2000
					});
					return
				}
				this.num++
				this.Listbox(this.current)
			},
			gotodeail(link) {
				
				uni.navigateTo({
					url: `/subpkg/detail/detail?url=${link}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page {

		height: 100%;

	}

	.xin_list {
		padding: 0 5rpx;
		box-sizing: border-box;
		width: 100%;
		margin-top: 30rpx;

		.xin_item {
			height: 380rpx;
			width: 100%;
			margin-bottom: 20rpx;
			padding: 5rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			border: 2px solid #dd544e;
			// height: 100%;
			display: flex;

			.img {

				width: 35%;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.titleright {
				width: 65%;
				padding: 0 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					width: 100%;
					font-size: 30rpx;
					color: #dd544e;

					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.count {
					width: 100%;


					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
					overflow: hidden;
					font-size: 28rpx;
				}

				.titbotton {
					font-size: 25rpx;
					color: gray;
				}
			}
		}
	}
</style>
