import App from './App'
import Vue from 'vue'
import store from './store'
Vue.prototype.$store = store

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

require('./utils/request.js')(app)

app.$mount()
