import Vue from 'vue'
import App from './App'
import all from 'common/applyAddress.js' //接口地址
import base64 from '@/common/base64.js';//base64加密
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$all=all;  //接口地址
Vue.prototype.$base64=base64;  //base64加密

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)


const app = new Vue({
	...App
})
app.$mount()
