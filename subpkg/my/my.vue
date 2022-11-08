<template>
	<view class="my">
		<text class="title">关于玩Android小程序</text>
		<view class="topmy">
			Hi！欢迎使用玩Android小程序！
		</view>
		<view class="fis">
			该项目是我个人基于鸿洋大神的玩android开放API开发的一款高颜值的微信小程序。这个项目拥有漂亮的界面和实用的功能,每天推荐20~30篇优质文章的站点
			如果你有一些更好的想法或建议，可以在GitHub里提交给我，我很欢迎大家一起维护。
			
			由于web-view引入外网的文章配置需要企业才能设置业务域名才能正常打开文章
		</view>
		<text class="ye">有什么问题也可以加我个人微信,记得备注来意</text>
		<image src="../../static/ye.jpg" mode="aspectFit"></image>
		<text class="daohao">永远相信美好的事件即将发生</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: gainsboro;
		.my {
			
			padding: 0 20rpx;
			box-sizing: border-box;
			background-color: white;
			margin: 50rpx auto;
			height: 100%;
			width: 90%;
			overflow: hidden;
		
		.title {
				margin-top: 30rpx;
				color: gray;
				display: flex;
				justify-content: center;
				font-size: 30rpx
			}
		
			.topmy {
				margin-top: 30rpx;
				font-size: 27rpx;
				color: lightslategrey;
		
			}
		
			.fis {
				margin-top: 10rpx;
				line-height: 56rpx;
				font-size: 27rpx;
				color: lightslategrey;
			}
		
			.ye {
				margin-top: 50rpx;
				font-size: 27rpx;
				color: lightslategrey;
				display: flex;
				justify-content: center;
			}
		
			image {
				margin-top: 50rpx;
			}
		
			.daohao {
				margin-top: 10rpx;
				font-size: 27rpx;
				color: orangered;
				display: flex;
				justify-content: center;
		         padding-bottom: 50rpx;
		
			}
		}
	}

	
</style>
