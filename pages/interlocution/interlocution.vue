<template>
	<view>
	 <detai-list @incremet="incremet" title="ok" :article="wenzlist" />
	</view>
</template>

<script>
export default {
	data(){
		return{
			wenzlist:[],
			num:0,
			total:0,
			curPage:0,
			size:0,
		}
	},
     onLoad(){
	   this.getinterlist()
	   
   },
   onShow() {
       // 退出后清除爱心 和登录显示爱心
   	let cookie = uni.getStorageSync("cookie")
   	if (!cookie) {
   		this.wenzlist.forEach(item => {
   			if (item.collect == true) {
   				item.num = 0
   				item.collect = !item.collect
   			}
   		})
   	} else {
   		this.wenzlist.forEach(item => {
   			if (item.num == 0) {
   				item.collect = true
   			}
   		})
   	}
   
   
   },
   methods:{
	   // 收藏
	   incremet(index, isok, id) {
	   	if (isok == true) {
	   		this.wenzlist[index].collect = true
	   	}
	   	if (isok == false) {
	   		this.wenzlist[index].collect = false
	   	}
	   
	   },
	   // 获取问答数据
	  async getinterlist(){
		    let wenzlist=await this.$request({url:`/wenda/list/${this.num}/json`,method:"GET"})
			wenzlist.data.datas.forEach(item=>{
				item.desc=item.desc.replace(/<[^>]+>/g, '')
				 item.shareUser=item.author
			})
			this.wenzlist=[...this.wenzlist,...wenzlist.data.datas]
			let {
				total,
				curPage,
				size
			} = wenzlist.data
			this.total = total
			this.curPage = curPage
			this.size = size
	   },
	   onReachBottom() {
	   	if (this.curPage * this.size >= this.total) {
	   		uni.showToast({
	   			title: '已经没有数据',
	   			duration: 2000
	   		});
	   		return
	   	}
	   	this.num++
	   	this.getinterlist()
	   },
   }
}
</script>

<style lang="scss">

</style>
