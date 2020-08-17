import Vue from 'vue'
import App from './App'
import GrzxInter from 'common/Grzx.js' //个人中心
import ChangeImage from 'common/changeImage.js' //更换图片

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$GrzxInter=GrzxInter;  //个人中心
Vue.prototype.$ChangeImage=ChangeImage; //更换图片

const app = new Vue({
    ...App
})
app.$mount()
