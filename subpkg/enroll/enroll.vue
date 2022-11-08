<template>
	<view>
		<view class="bgtop">
			<image src="../../static/logo.png" mode=""></image>
			<view class="title">
				欢迎使用
			</view>
		</view>
		<uni-forms ref="form" :modelValue="enrollData" :rules="enroolrules" >
			<uni-forms-item label="用户名" name="username">
				<view class="wid">
				<uni-easyinput type="text" v-model="enrollData.username" placeholder="请输入用户名" />	
				</view>
			</uni-forms-item>
			<uni-forms-item label="密码" name="password">
				<view class="wid">
					<uni-easyinput type="password" v-model="enrollData.password" placeholder="请输入密码"></uni-easyinput>
				</view>
			</uni-forms-item>
			<uni-forms-item label="密码" name="repassword">
				<view class="wid">
					<uni-easyinput type="password" v-model="enrollData.repassword" placeholder="请输入二次密码"></uni-easyinput>
				</view>
			</uni-forms-item>
			</uni-forms>
			<button  class="btn" @click="ye" type="primary">注册</button>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				enrollData:{
					username:"",
					password:"",
					repassword:""
				},
				enroolrules:{
					username:{
						rules:[
						{
								required: true,
								errorMessage: '请输入用户名',
							},
							{
										minLength: 3,
										maxLength: 8,
										errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
									},
									
						]
					},
					password:{
						rules:[
							{
									required: true,
									errorMessage: '请输入密码',
								},
									{
												minLength: 6,
												maxLength: 8,
												errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
											}
						]
					},
					repassword:{
						rules:[
						{
								required: true,
								errorMessage: '请输入密码',
							},
								{
											minLength: 6,
											maxLength: 8,
											errorMessage: '二次密码长度在 {minLength} 到 {maxLength} 个字符',
										}
						]
					}
				},
			};
		},
		methods:{
			ye(){
				this.$refs.form.validate().then(async res=>{
				 let zhu=await this.$request({url:`/user/register?username=${this.enrollData.username}&password=${this.enrollData.password}&repassword=${this.enrollData.repassword}`,method:"POST"})
				 console.log(zhu)
				 if(zhu.errorCode===0){
					uni.$showMsg({title:"注册成功",icon:"success"})
					setTimeout(()=>{
						uni.redirectTo({
							url:"/subpkg/login/login"
						})
					},2000)
				 }else{
					 uni.$showMsg({title:zhu.errorMsg,icon:"none"})
				 }
				})
			}
		}
	}
</script>

<style lang="scss">
.bgtop{
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background-color: skyblue;
	 height: 400rpx;
	 image{
		 
		 width: 200rpx;
		 height: 200rpx;
	
	 }
	 .title{
		 margin-top: 40rpx;
		 color: white;
		 font-weight: bold;
	 }
}
.uni-forms{
	margin-top: 80rpx;
	display: flex;
	justify-content: center;
}
.uni-forms-item{
	width: 650rpx;
}
	.btn{
			
		
			margin-top: 100rpx;
			width: 400rpx;
			height: 70rpx;
	
			line-height: 70rpx;
		}
</style>
