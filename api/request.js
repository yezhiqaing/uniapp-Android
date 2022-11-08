import api from "./bast.js"
let num = 0
export default (option) => {
 
	  let a=option.url.split("?")
	return new Promise((resolve, reject) => {
	
		num++
		uni.showLoading({
			title: '加载中'
		});
		uni.request({
       
			url: api.bas + option.url,
			method: option.method || "GET",
			data:option.data||{},
			header:{
				cookie:uni.getStorageSync("cookie")
			},
			success: (res) => {
				  // 判断是否请求成功 和保存cookie 为后面需要登录后才能请求
				if(res.data.errorCode===0){
					if(a[0]=="/user/login"){
						uni.setStorageSync('cookie',res.header["Set-Cookie"])
					}
					
				}
	
			resolve(res.data)

				num--
				if (num == 0) {
					uni.hideLoading();
				}
			},
			fail: (err) => {
				reject(err)
			}

		})

	})
}
