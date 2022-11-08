<template>
	<view >
		<view class="bg">
			<view   v-for="item in pai" :key="item.id"  class="paiitem">
				<view class="paileft">
					<view>{{item.rank}}</view>
					<text style="margin-left: 20rpx;">{{item.username}}</text>
				</view>
				    <view>
				    	{{item.coinCount}}
				    </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pai:[]
			};
		},
		onLoad(){
			 this.Getpai()
		},
		methods:{
		 async	Getpai(){
			 let  pai=await	this.$request({url:"/coin/rank/1/json",method:"GET"})
			
				this.pai=pai.data.datas
			}

		}
	}
</script>

<style lang="scss">
	.bg{
  
   
	}
.paiitem{
	
	z-index: 999;
	font-size: 25rpx;
	display: flex;
	margin: 0 20rpx;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	height: 80rpx;
	background-color: #fff;
	
	.paileft{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
