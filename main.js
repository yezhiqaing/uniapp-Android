import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// 字体图标
import  "style/inconfont.css"
import request from"./api/request.js"
// 引入请求放在原型上
Vue.prototype.$request=request
Vue.config.productionTip = false

uni.$showMsg=function(info){
	uni.showToast({
		title: info.title,
		duration: 2000,
		icon:info.icon
	});
}

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif