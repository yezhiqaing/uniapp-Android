<template>
	<view class="searchbox">
		<!-- 热门搜索 -->
		<view class="search_s">

			<view class="hot">{{list}}</view>
			<view @click="cleartag" v-if="list=='历史记录'" class="frihg">
				清除
			</view>
			<view class="search_itme">
				<uni-tag @click="gotolist(item.name)" v-for="item in Hot" :key="item.id" :text="item.name" :type="text" size="mini" />
			</view>
		</view </view>

	</view>
</template>

<script>
	export default {
		props: ['Hot', 'list'],
		data() {
			return {

			};
		},

		methods: {
			 // 触发清除历史回调函数
			cleartag() {
              this.$emit('clear')

			},
			gotolist(valu){
				uni.navigateTo({
					url:`/subpkg/searchlist/searchlist?val=${valu}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.searchbox {

		.search_s {
			padding: 0 10rpx;
			margin: 20rpx;

			.frihg {
				float: right;
				font-size: 20rpx;
				color: gray;
			}

			.hot {
				color: royalblue;
				font-size: 29rpx
			}

			.search_itme {
				uni-tag {
					display: inline-block;
					margin-top:10rpx;
				


				}
			}
		}
	}
</style>
