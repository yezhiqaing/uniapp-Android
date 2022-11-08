<template>
	<view class="addshare">			<uni-forms label-position="top" ref="form" :modelValue="formData" :rules="rules">

			<uni-forms-item label="文章标题" name="title">
				<input type="text" v-model="formData.title" placeholder="100字以内文字" />
			</uni-forms-item>
			<uni-forms-item label="文章链接" name="url">
				<input type="text" v-model="formData.url" placeholder="如:https://baidu.com" />
			</uni-forms-item>

		</uni-forms>
		<button @click="btn" class="btn" type="primary">分享</button>
		<view class="text">
			<view>1.只要是任何好文都可以分享哈，并不一定要是原创！投递的文章会进入广场 tab;</view>
			<view>2.CSDN，掘金，简书等官方博客站点会直接通过，不需要审核</view>
			<view>3.其他个人站点会进入审核阶段，不要投递任何无效链接，否则可能会对你的账号产生一定影响;</view>
			<view>4.如果你发现错误，可以提交日志，让我们一起使网站变得更好。</view>
			<view>5.由于本站为个人开发与维护，会尽力保证24小时内审核，当然有可能哪天太累，会延期，请保持佛系...</view>
		</view>
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				formData: {
                   title:"",
				   url:""
				},
				rules: {
					title: {
						rules: [{
								required: true,
								errorMessage: '请填写文章标题',
							},
							{
								minLength: 1,
								maxLength: 100,
								errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					url: {
						rules: [
							{
									required: true,
									errorMessage: '请填写网址',
								},
							{
								pattern: /^(http(s?)|):\/\/(.+)$/,
								errorMessage: "必须以http或https开头"
							}
						]
					}
				}
			}
		},
		methods: {
		btn(){
			this.$refs.form.validate().then(async res=>{
			  let re=await	this.$request({url:`/lg/user_article/add/json?title=${this.formData.title}&link=${this.formData.url}`,method:"POST"})
			   console.log(re)
			   if(re.errorCode==0){
				   	uni.$showMsg({title:"分享成功",icon:"success"})
					uni.redirectTo({
						url:"/subpkg/share/share"
					})
			   }
			},err=>{
				console.log(err)
			})
		}
		}
	}
</script>

<style lang="scss">
	.addshare {
		padding: 0 20rpx;

		.btn {
			margin-top: 20rpx;
			width: 400rpx;
		}
		.text{
			padding: 10rpx;
			position: absolute;
			bottom: 20rpx	;
	       display: flex;
          flex-direction: column;
		  font-size: 26rpx;
		 color: grey;
		 view{
			 margin-bottom: 10rpx;
		 }
 		}
	}
</style>
