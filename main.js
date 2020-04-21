import Vue from 'vue'
import App from './App'
import {request} from './assets/uni.ajax.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
