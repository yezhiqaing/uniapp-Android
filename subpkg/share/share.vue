
<template>
	<view>
			<uni-swipe-action-item  v-for="item in share" :key="item.id" :right-options="options"  @click="onClick(item.id)" >
					<view @click="gotodetil(item.link)"  class="shareitem">
						<view class="titletop">
							<text>{{item.shareUser}}</text>
							<text>{{item.niceDate}}</text>
						</view>
						<view class="count">
							{{item.title}}
						</view>
						 <view class="titlebottom">
						<text>{{item.superChapterName+" · "+item.chapterName}}</text>
						  <view @click.stop="collbtn(item.id)" class="caoll">
						  
						  	<uni-icons v-if="!item.collect" type="heart" size="23"></uni-icons>
						  	<uni-icons v-else  color="red" type="heart-filled" size="23"></uni-icons>
						 </view>
						 </view>
						
					</view>
					
				</uni-swipe-action-item>
				 
	              	 <uni-icons class="a" @click="goaddshare" color="blue"  type="plus-filled" size="60"></uni-icons>
	 	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				share:[],
				   options:[
				        {
				            text: '删除',
				            style: {
				                backgroundColor: 'orange'
				            }
				        }
				      ]
			};
		},
		onLoad(){
			this.sharelist()
		},
		methods:{
			 // 获取自己分享的文章
		 async	sharelist(){
			  let share=await	this.$request({url:"/user/lg/private_articles/1/json",method:"GET"})
			  console.log(share)
			  this.share=share.data.shareArticles.datas
			},
			// 去往外网
			gotodetil(link){
				uni.navigateTo({
					url:`/subpkg/detail/detail?url=${link}`
				})
			},
			// 删除分享
			 async  onClick(id){
				    let ski=await	this.$request({url:`/lg/user_article/delete/${id}/json`,method:"POST"})
				 this.sharelist()
			
			    },
				// 跳转分享文章页面
			  goaddshare(){
				  uni.navigateTo({
				  	 url:'/subpkg/addshare/addshare' 
				  })
			  },
			  collbtn(id){
			
				  // this.share[index].collect=!this.share[index].collect
				  this.share.forEach(item=>{
					  if(item.id==id){
						  item.collect=!item.collect
					  }
				  })
			  }
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: ghostwhite;
	}
.shareitem{
	padding: 0 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 200rpx;
	width: 100%;
	background-color: white;
	.count{
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
		font-size: 29rpx
	}
	.titletop{
		color: gray;
		font-size: 25rpx;
		display: flex;
		justify-content: space-between;
	}
	.titlebottom{
		display: flex;
		justify-content: space-between;
		color: gray;
		font-size: 27rpx;
	}
	

}
.a{
	position: absolute;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
}
</style>