<template>
	<view>
		<view class="valin">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item label="账号" name="username">
					<view class="wid">
						<uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号" />
					</view>
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<view class="wid">
						<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码"></uni-easyinput>
					</view>
				</uni-forms-item>

			</uni-forms>
			<view @click="gotoenro" class="xin">
				去注册
			</view>
			<button class="btn" @click="ye" type="warn">登录</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				formData: {
					username: "",
					password: ""
				},
				rules: {
					username: {
						rules: [{
								required: true,
								errorMessage: '请输入账号',
							},
							{
								minLength: 1,
								maxLength: 6,
								errorMessage: '账号长度在 {minLength} 到 {maxLength} 个字符',
							},
							{
								format: 'string',
								errorMessage: '年龄只能输入数字'
							}
						]
					},
					password: {
						rules: [
							{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								minLength: 3,
								maxLength: 8,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							},


						]
					}
				}
			}
		},

		methods: {


			async ye() {
				this.$refs.form.validate().then(async res => {
					// 判断输入是否合法
					if (res.username) {
						let a = await this.$request({
							url: `/user/login?username=${this.formData.username}&password=${this.formData.password}`,
							method: "POST"
						})

						// 登录成功提示
						if (a.errorCode === 0) {
							uni.$showMsg({
								title: "登录成功",
								icon: "success"
							})
							// 获取个人积分
							let ji = await this.$request({
								url: "/lg/coin/userinfo/json",
								method: "GET"
							})

							uni.setStorageSync("integral", ji.data)
							uni.setStorageSync("user", a.data.nickname)


							// 登录成功后返回之前页面
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 上一页
							console.log(beforePage)
							uni.navigateBack({
								url: "beforePage.route"
							});


						}

					}
				}, err => {
					console.log(err)
				})

			},
			gotoenro() {
				uni.redirectTo({
					url: "/subpkg/enroll/enroll"
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		// padding: 15px;
		background-color: #fff;
	}

	.valin {
		margin-top: 100rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		// margin: 0 auto;
		// padding-top: 190rpx;


		.wid {
			width: 500rpx;
		}

		.xin {

			position: absolute;
			right: 37px;
			top: 167px;
			font-size: 25rpx;
			color: red;
		}

		.btn {

			position: relative;
			margin-top: 100rpx;
			width: 400rpx;
			height: 70rpx;

			line-height: 70rpx;
		}
	}
</style>
