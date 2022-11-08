<template>
	<view class="searchbox">
		<uni-row class="demo-uni-row">
			<uni-col :span="20">
				<uni-search-bar class="uni-mt-10" v-model="valu" radius="5" placeholder="请输入关键字" clearButton="auto" cancelButton="none"
					@confirm="search" />
			</uni-col>
			<uni-col class="icon" :span="2">
				<view @click="gotolist" class="iconfont icon-sousuo"></view>
			</uni-col>
		</uni-row>
            <!-- 热门搜索 -->
		   <search-hotlist :Hot="Hot" list="热门搜索"/>
		    <search-hotlist @clear="lisear"  :Hot="Lis" list="历史记录"/>
				 
			 
			
			
	</view>
</template>

<script>

	export default {
		data() {
			return {
				valu:"",
               Hot:[],
			   Lis:uni.getStorageSync('List')||[]
			};
		},
		onLoad() {
			this.Gethot()
		      
		},
		
		methods: {
			
			// 携带参数跳转到搜索结果页
			gotolist(){
				uni.navigateTo({
					url:`/subpkg/searchlist/searchlist?val=${this.valu}`
				})
			},
			 // enter按下搜索触发事件
			search(res) {
				this.gotolist()
			this.Lis.push(res)
			  // 改变数据
			 this.Lis.forEach(item=>{
				 item.name=item.value
			 })
			  // 存在缓存
			 uni.setStorageSync("List",this.Lis)
			 
			
			
			
		        	 
			},
			// 清除历史的自定义回调函数
			lisear(){
				uni.removeStorageSync("List")
				this.Lis=[]
			},
			async Gethot() {
				let {data}= await this.$request({
					url: "/hotkey/json",
					method: "GET",
				})
				
				this.Hot=data
			 
			}
		}
	}
</script>

<style lang="scss">
	.searchbox {


		.uni-row {
			background-color: #dd544e;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;

		}
		.search_s{
			  padding: 0 10rpx;
			  margin: 20rpx;
		.hot{
				color:royalblue;
				font-size: 29rpx
			}
			.search_itme{
				.uni-tag{
					color: gray;
					margin-right: 20rpx;
				    margin-top: 30rpx;
					background-color: gainsboro;
					
				}
			}
		}
	}
</style>
