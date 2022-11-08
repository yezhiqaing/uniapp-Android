<template>
	<view class="integral">
		<view class="bgtop">
			<view @click="gotopaim" class="iconfont icon-paiming"></view>
			<text>{{ids}}</text>
		</view>
		<view class="jilist">
			<view v-for="item in leiJia" :key="item.id" class="jiitem">
				<view class="jileft">
					<view style="font-size: 27rpx;">
						{{item.reason+item.desc}}
					</view>
					<text class="time">2022-10-29 00:35:58</text>
				</view>
				<view style="color:blue;font-size: 27rpx;">
					+{{item.coinCount}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ids: "",
				leiJia: []
			};
		},
		onLoad(a) {
			this.ids = a.ji
			this.Getjifen()
		},
		methods: {
			// 发起个人积分获取列表
			async Getjifen() {
				let a = await this.$request({
					url: "/lg/coin/list/1/json",
					method: "GET"
				})
				// 改变一下数据
				a.data.datas.forEach(item => {
					let des = item.desc.split(",")
					let tis = des[1].split("：")
					item.desc = tis[0] + tis[1]
				})
				this.leiJia = a.data.datas

			},
			gotopaim(){
			uni.navigateTo({
					url:"/subpkg/ranking/ranking"
				})
			}
		}
	}
</script>

<style lang="scss">
	.integral {
		.bgtop {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #dd544e;
			height: 300rpx;
            .icon-paiming{
				position: absolute;
				top: 0;
				right:20rpx;
				font-size: 50rpx;
				color: #fff;
				
			}
			text {
				font-size: 100rpx;
				color: #fff;
			}
		}

		.jilist {
			background-color: white;

			.jiitem {
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;

				// background-color: #bfa;
				.jileft {
					.time {
						color: gainsboro;
						font-size: 20rpx
					}
				}
			}

		}
	}
</style>

