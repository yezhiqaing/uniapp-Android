<template>
	<view>
		<detai-list v-if="collection.length!=0"  @incremet="incremet" :article="collection"/>
		<view v-else class="model" >
			<image src="../../static/shuji.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collection:[]
			};
		},
		onLoad(){
			this.collect()
		},
		methods:{
			// 取消收藏
		  async	incremet(index,isok,id){
			  console.log(id)
				let res=await this.$request({url:`/lg/uncollect/${id}/json?originId=-1`,method:"POST"})
				if(res.errorCode===0){
					this.collection[index].collect=false
					this.collection.splice(index,1)
					
				// 	console.log(index)
					
				}
			},
			// 获取收藏列表 
		   async	collect(){
			  let coll=await this.$request({url:"/lg/collect/list/0/json",method:"GET"})
			  coll.data.datas.forEach(item=>{
				item.collect=true
			  })
			  console.log(coll)
			  this.collection=coll.data.datas||[]
			}
		}
	}
</script>

<style lang="scss">
.model{
 width: 320px;
 height: 420px;
 margin-top: 50%;
 margin-left: 50%;
 transform: translateX(-50%);
	
}
</style>
