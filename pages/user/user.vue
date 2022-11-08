<template>

	<view class="userbox">
		<view class="bg">
			<view v-if="!cookie" class="userto">
				<image src="../../static/user.jpg" mode=""></image>
			</view>
			<view v-if="cookie" class="userto">
				<image src="/static/R-C.jpg" mode=""></image>
				</view>
			<view v-if="!cookie" @click="gologin" class="login">
				去登录
			</view>
			<view v-if="cookie"  @click="gologin" class="login">
				{{name}}
			</view>
		    <view v-if="cookie" class="ji">
		    	<view >等级:{{integral.level}}</view>
		    	<view style="margin-left: 10rpx;">排名:{{integral.rank}}</view>
		    </view>
		</view>

		<view @click="Tiao(index)" v-for="(item,index) in tesitem" :key="item.id" class="bottonitem">
			<view class="left">
				<view style="color:#dd544e ;" :class="item.icon"></view>
				<view class="text">
					{{item.text}}
				</view>
			</view>
			<uni-icons type="forward" size="15"></uni-icons>
		</view>
		<button v-if="cookie" @click="outlo" size="mini" class="tuichu" type="warn">退出登录</button>
	    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:uni.getStorageSync("user"),
				integral:uni.getStorageSync("integral"),
				cookie:uni.getStorageSync("cookie"),
				tesitem: [{
						id: 0,
						icon: "iconfont icon-zuanshi",
						text: "我的积分"
					},
					{
						id: 1,
						icon: "iconfont icon-fenxiang",
						text: "我的分享"
					},
					{
						id: 2,
						icon: "iconfont icon-jushoucang",
						text: "我的收藏"
					},
				
					{
						id: 6,
						icon: "iconfont icon-guanyu",
						text: "关于作者"
					},

				]
			}
		},
          onShow(){
				this.name=uni.getStorageSync("user")
				  this.integral=uni.getStorageSync("integral")
		           this.cookie=uni.getStorageSync("cookie")
		  },
		methods: {

			// 账号未登录，请先前往登录
		Tiao(index){
			switch(index){
				    case 0:
				         if(this.cookie){
							 uni.navigateTo({
							 	 url:`/subpkg/jifen/jifen?ji=${this.integral.coinCount}` 
							 })
						 }else{
							this.show()
						 }
				          break;
						  case 1:
						   if(this.cookie){
							   uni.navigateTo({
							   	 url:'/subpkg/share/share' 
							   })
						   }else{
							this.show()
						 }
						  break;
						  case 2:
						      if(this.cookie){
								  uni.navigateTo({
								  	 url:'/subpkg/collection/collection' 
								  })
							  }else{
								  this.show()
							  }
						   break;
						   case 3:
						   uni.navigateTo({
						   	 url:'/subpkg/my/my' 
						   })
						   break;
			}
		},
			gologin() {
				uni.navigateTo({
					url: "/subpkg/login/login"
				})
			},
			show(){
				uni.showModal({
					title: '提示',
					content: '账号未登录，请先前往登录',
					success: function (res) {
						if (res.confirm) {
						  uni.redirectTo({
							 url:"/subpkg/login/login"
													  })
						} 
					}
				});
			},
		
			 // 退出
			outlo() {
				uni.showModal({
					title: '提示',
					content: '确定退出?',
					success: async (res) => {
						if (res.confirm) {
							let tui = await this.$request({
								url: "/user/logout/json",
								method: "get"
							})
							// 退出后的提示清除
							if (tui.errorCode == 0) {
								uni.$showMsg({
									title: "退出成功",
									error: "success"
								})
								uni.removeStorageSync("user")
								uni.removeStorageSync("cookie")
								uni.removeStorageSync("integral")
								this.name = ""
								this.cookie=""
								this.integral={}
							}
						} 
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.bg {

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 300rpx;
		background-color: #dd544e;

		.userto {
			width: 100rpx;
			height: 100rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
			
		}

		.login {
			margin-top: 20rpx;
			color: #fff;
		}
		.ji{
			display: flex;
			justify-content: center;
			color:#F6F6F6;
			font-size: 20rpx;
			margin-top: 20rpx;
			
			
		}
	}

	.bottonitem {
		padding: 20rpx 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			width: 200rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.text {
				font-size: 25rpx
			}

		}
	}

	.tuichu {
		margin-top: 80rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);

	}
</style>
