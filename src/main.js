// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/vuex/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import moment from 'moment'

Vue.use(MintUI)

Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

// 日期格式化
Vue.filter('dateFormat', function(value) {
  if(!value) return ''
  return moment(value).fromNow().replace(/\s/g, '').replace(/\ban?/, '1').replace('fewseconds','分钟').replace(/minutes?/, '分钟').replace(/hours?/, '小时').replace(/days?/, '天').replace(/months?/, '个月').replace(/years?/, '年').replace('ago', '前')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
