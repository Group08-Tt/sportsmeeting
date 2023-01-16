import Vue from 'vue'
import App from './App'
import Json from './Json' //测试用数据
import uView from "uview-ui";
Vue.use(uView);

import request from './commen/serve/serve.js'
import {api} from './commen/serve/api.js'

import basics from './pages/basics/index.vue'
Vue.component('basics', basics)

import components from './pages/component/index.vue'
Vue.component('components', components)

import plugin from './pages/plugin/index.vue'
Vue.component('plugin', plugin)

import datalistt from './pages/datalistt/index.vue'
Vue.component('datalistt', datalistt)

import my from './pages/my/index.vue'
Vue.component('my', my)

import general_showone from './components/general/general_showone.vue'
Vue.component('general-showone',general_showone)

import cuCustom from './commen/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

import loadRefresh from '@/components/load-refresh/load-refresh.vue'
Vue.component('load-refresh',loadRefresh)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$http = request;
Vue.prototype.$api = api;
Vue.prototype.$ceshi = Json;

const app = new Vue({
	...App
})
app.$mount()
