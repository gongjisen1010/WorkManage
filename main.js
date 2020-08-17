import Vue from 'vue'
import App from './App'
import GrzxInter from 'common/Grzx.js' //个人中心

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$GrzxInter=GrzxInter;  //个人中心

const app = new Vue({
    ...App
})
app.$mount()
