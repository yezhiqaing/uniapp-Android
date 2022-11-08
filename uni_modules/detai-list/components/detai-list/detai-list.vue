<template>
	<!-- 文章 -->
	<view class="article_list">
		<view @click="gotodeail(item.link)" v-for="(item,index) in article" :key="index" class="article_item">
			<!-- 上 -->
			<view class="nametime">
				<view class="userleft">
					<view class="user">{{item.shareUser||item.chapterName}}</view>
					<view v-if="item.tags.length!==0" class="table">{{item.tags[0].name}}</view>
				</view>
				<view class="time">{{item.niceDate}}</view>
			</view>
			<!-- 中 -->
			<view  class="title">{{item.title}}</view>
			<view class="deslist" v-if="title=='ok'">
				{{item.desc}}
			</view>
			<!-- 底 -->
			<view class="Fenleiai">
				<view class="fen">{{item.superChapterName}}·{{item.chapterName}}</view>
				<view @click.stop="collbtn(item.id,index,item)" class="caoll">
                    <uni-icons v-if="!item.collect" type="heart" size="20"></uni-icons>
					<uni-icons v-else color="red" type="heart-filled" size="20"></uni-icons>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		props: ["article","title"],

		data() {
			return {

			}
		},
     
		methods: {
			// 文章跳转
			gotodeail(link) {
				uni.navigateTo({
					url: `/subpkg/detail/detail?url=${link}`
				})
			},


			async collbtn(id, index, item) {
				let cookie = uni.getStorageSync("cookie")
				// 判断是否登录
				if (cookie) {
					if (item.collect == false) {
						// 收藏
						let res = await this.$request({
							url: `/lg/collect/${id}/json`,
							method: "POST"
						})
						console.log(res)
						if (res.errorCode === 0) {
							this.$emit("incremet", index, true)
						}
					} else {
						// 取消收藏
						let quxiao = await this.$request({
							url: `/lg/uncollect_originId/${id}/json`,
							method: "POST"
						})
						if (quxiao.errorCode === 0) {
							this.$emit("incremet", index, false, id)
						}
					}
				} else {
					
					uni.showModal({
						title: '提示',
						content: '账号未登录，请先前往登录',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo ({
									url: `/subpkg/login/login`
								})
							}
						}
					});
				
				}
			}
		}
	}
</script>

<style lang="scss">
	.article_list{
		margin-top: 10rpx;
		.article_item {
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			padding: 0 20rpx;
			// height: 200rpx;
			margin-bottom: 10rpx;
			background-color: #fff;
			border-bottom: 1px solid gainsboro;
		
			.nametime {
				display: flex;
				justify-content: space-between;
				color: #9a9a9a;
				font-size: 20rpx;
		
				.userleft {
					display: flex;
					align-items: center;
		
					.table {
						margin-left: 10rpx;
						font-size: 17rpx;
						color: #4295dd;
						padding: 3rpx;
						border-radius: 5rpx;
						box-sizing: border-box;
						border: 1px solid #4295dd;
		
					}
				}
		
			}
		
		
			.title {
				font-family: "微软雅黑";
				margin: 30rpx 0;
				font-size: 26rpx;
				width: 100%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
			overflow: hidden;
			}
		
			.Fenleiai {
				margin-bottom: 5rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #9a9a9a;
				font-size: 20rpx;
			}
		
		
		
		}
	}


	.bg {
		background-color: red;
	}
	.deslist{
		color: grey;
		// width: 100%;
		margin-bottom: 10rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		font-size: 24rpx;
	}
</style>
