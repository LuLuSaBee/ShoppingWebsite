// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-TW'
import NormailizeCss from 'normalize.css'
import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'

import global_ from './store/Global'//引用檔案
Vue.prototype.GLOBAL = global_//掛載到Vue例項上面

import axios from 'axios';
Vue.prototype.$https = axios;

Vue.use(Element, { locale })
// Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})