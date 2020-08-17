import Vue from 'vue'
import App from './App'
import Sbjg from 'common/sbjg.js'   //设备监管
import oSit from 'common/overallSituation.js' //全局js文件

Vue.config.productionTip = false

Vue.prototype.$Sbjg=Sbjg;  //设备监管
Vue.prototype.$oSit=oSit;  //全局文件

App.mpType = 'app'

const app = new Vue({
    ...App
})

//模拟异步请求数据 - 设备监管
const sbjg = type=>{
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Sbjg[type]);
		}, 500)
	})
}

Vue.prototype.$api = {Sbjg};
app.$mount()
