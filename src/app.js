import Vue from 'vue'

const isDevMode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDevMode
Vue.config.devtools = isDevMode
Vue.config.productionTip = isDevMode

var app = new Vue({
  el: '#app',
  template: '<h2>{{ message }}</h2>',
  data: {
    message: 'Hello Vue!'
  }
})
