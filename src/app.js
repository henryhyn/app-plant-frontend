import 'normalize.css'
import Vue from 'vue'
import Layout from '@/pages/Layout'
import router from '@/router'

const isDevMode = process.env.NODE_ENV !== 'production'
Vue.config.devtools = isDevMode

var app = new Vue({
  el: '#app',
  router,
  template: '<layout/>',
  components: { Layout }
})
