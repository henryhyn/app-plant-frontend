import Vue from 'vue'
import Layout from '@/pages/Layout'

const isDevMode = process.env.NODE_ENV !== 'production'
Vue.config.devtools = isDevMode

var app = new Vue({
  el: '#app',
  template: '<layout/>',
  components: { Layout }
})
