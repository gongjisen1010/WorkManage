import Vue from 'vue'
import App from './App'
import Sbjg from 'common/sbjg.js'   //设备监管
import oSit from 'common/overallSituation.js' //全局js文件
import GrzxInter from 'common/Grzx.js' //个人中心
import ChangeImage from 'common/changeImage.js' //更换图片

Vue.config.productionTip = false

Vue.prototype.$Sbjg=Sbjg;  //设备监管
Vue.prototype.$oSit=oSit;  //全局文件

App.mpType = 'app'
Vue.prototype.$GrzxInter=GrzxInter;  //个人中心
Vue.prototype.$ChangeImage=ChangeImage; //更换图片

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
