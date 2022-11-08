<template>
	<view class="content">
		<!-- 头部 -->
		<view class="search">
			<image src="../../static/R-C.jpg"></image>
			<view class="title">玩安卓</view>
			<view @click="gotosearch" class="iconfont icon-sousuo"></view>
		</view>

		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item @click="gotodeail(item.url)" v-for="item in banner" :key="item.id">
				<image :src="item.imagePath" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<detai-list @incremet="incremet" :article="article" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				article: [],
				num: 0,
				total: 0,
				curPage: 0,
				size: 0

			}
		},
		onLoad() {

			this.Getbanner()
			this.Getarticlelist()
		},
		onShow() {
			// 退出后清除爱心 和登录显示爱心
			let cookie = uni.getStorageSync("cookie")
			if (!cookie) {
				this.article.forEach(item => {
					if (item.collect == true) {
						item.num = 0
						item.collect = !item.collect
					}
				})
			} else {
				this.article.forEach(item => {
					if (item.num == 0) {
						item.collect = true
					}
				})
			}


		},
		methods: {
			gotodeail(link) {
				uni.navigateTo({
					url: `/subpkg/detail/detail?url=${link}`
				})
			},
			// 收藏
			incremet(index, isok, id) {
				if (isok == true) {
					this.article[index].collect = true
				}
				if (isok == false) {
					this.article[index].collect = false
					console.log(id)
				}

			},
			// 轮播图
			async Getbanner() {
				let banner = await this.$request({
					url: "/banner/json",
					method: "GET"
				})
				this.banner = banner.data
			},
			// 请求文章列表
			async Getarticlelist() {

				let article = await this.$request({
					url: "/article/list/" + this.num + "/json",
					method: "GET",
					data: {
						page_size: 10
					}
				})
				this.article = [...this.article, ...article.data.datas]
				let {
					total,
					curPage,
					size
				} = article.data
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
				this.Getarticlelist()
			},
			// 跳转到搜索页面
			gotosearch() {
				uni.redirectTo({
					url: "/subpkg/search/search"
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;

		.search {
			padding-left: 58rpx;
			padding-right: 100rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			display: flex;
			height: 120rpx;
			background-color: #dd544e;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;

			}

			.title {
				color: #fff;
			}

			.iconfont {
				color: #fff;
				font-size: 40rpx
			}
		}

		swiper {
			height: 400rpx;

			swiper-item {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}
</style>
