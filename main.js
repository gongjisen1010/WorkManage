import Vue from 'vue'
import App from './App'
import all from 'common/applyAddress.js' //接口地址
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$all=all;  //接口地址

const app = new Vue({
	...App
})
app.$mount()
