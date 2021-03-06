import 'normalize.css'
import '@/style/main.less'
import Vue from 'vue'
import Layout from '@/pages/Layout'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/filters'
import Hex from '@/utils/Hex'
Vue.use(ElementUI)
Vue.prototype.hex = Hex

const isDevMode = process.env.NODE_ENV !== 'production'
Vue.config.devtools = isDevMode

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Layout)
})
