<template>
	<view class="Tixibox">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
			activeColor="#007aff"></uni-segmented-control>
		<view class="content">
			<!-- 体系 -->
			<view style="height: 100%; padding: 0 20rpx;" v-show="current === 0">
				<view v-for="item in Tixi" :key="item.id" class="Tixilist">
					<view class="Tixititle">{{item.name}}</view>
					<view class="Tixiitem">

						<uni-tag @click="gotixi(item2.id,item,index)" v-for="(item2,index) in item.children" :key="item2.id"
							:text="item2.name" size="normal" />

					</view>
				</view>
			</view>
			<!-- 导航 -->
			<view style="height: 100%; padding: 0 20rpx;" v-show="current === 1">
				<view v-for="item in nav" :key="item.id" class="Tixilist">
					<view class="Tixititle">{{item.name}}</view>
					<view class="Tixiitem">

						<uni-tag @click="gonavdeial(item2.link)" v-for="item2 in item.articles" :key="item2.id"
							:text="item2.title" size="normal" />

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
				Tixi: [],
				nav: [],
				items: ['体系', '导航'],
				current: 0,
				colorIndex: 0,

				tichilde: []
			};

		},
		onLoad() {
			this.GetTixi()
			this.Getnav()
		},
		methods: {
			// 体系数据
			async GetTixi() {
				let tixi = await this.$request({
					url: "/tree/json",
					method: "GET"
				})
				this.Tixi = tixi.data
			

			},
			// 导航数据
			async Getnav() {
				let nav = await this.$request({
					url: "/navi/json",
					method: "GET"
				})
				this.nav = nav.data

			},
			// 导航区域跳转
			gonavdeial(link) {
				uni.navigateTo({
					url: `/subpkg/detail/detail?url=${link}`
				})
			},
			gotixi(id,item,index) {
			
			        let {children,name}=item
				    let a=JSON.stringify(children)
				uni.navigateTo({
					url: `/pages/Tidetail/Tidetail?ids=${id}&active=${index}&name=${name}&item=${encodeURIComponent(a)}`
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #ffffff;
	}

	.Tixibox {
		height: 100%;

		// padding: 0 20rpx;
		content-text {
			height: 100%;
			font-size: 14px;
			color: #666;

		}

		uni-segmented-control {
			.segmented-control {

				background-color: #dd544e !important;
			}
		}

		.uni-padding-wrap {

			padding: 0px 30px;
		}

		.content {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;
			height: 100%;

			.Tixilist {

				// height: 100%;
				.Tixititle {
					margin-top: 50rpx;
					font-size: 29rpx;
					color: grey;
				}

				.Tixiitem {
					width: 100%;
					display: flex;
					margin-bottom: 30rpx;
					flex-wrap: wrap;

					uni-tag {
						margin-top: 30rpx;

						margin-right: 20rpx;
						border-color: #f6f6f6;

						// margin-bottom: 20rpx;
						.uni-tag.data-v-1516016e {
							margin-top: 30rpx;
							background-color: #f6f6f6;
							margin-right: 20rpx;
							color: black;
							background-color: #f6f6f6 !important;

						}
					}
				}
			}

		}

	}
</style>



<!-- <view v-for="item in Tixi" :key="item.id" class="Tixilist">
						     	<view class="Tixititle">{{item.name}}</view>
						    			 <view class="Tixiitem">
						    			
						    					<uni-tag  v-for="item2 in item.children" :key="item2.id" :circle="true" :text="item2.name" size="normal" />	 	
						    				
						    			 </view>
						     </view> -->


<!-- 				 .Tixilist{
							 	height: 100%;
							 	.Tixititle{
							 		margin-top: 50rpx;
							 		font-size: 29rpx;
							 		color: grey;
							 	}
							 	.Tixiitem{
							 	width: 100%;
							 	display: flex;
							 		margin-bottom: 30rpx;
							 		flex-wrap: wrap;
							 		uni-tag{
							 			margin-top: 30rpx;
							 		
							 			margin-right: 20rpx;  
							 			border-color: #f6f6f6 ;
							 			// margin-bottom: 20rpx;
							 			.uni-tag.data-v-1516016e{
							 				margin-top: 30rpx;
							 					background-color: #f6f6f6;
							 				margin-right: 20rpx;  
							 				color:black;
							 			background-color:#f6f6f6 !important;
							 			
							 			}
							 		}
							 	}
							 } -->
