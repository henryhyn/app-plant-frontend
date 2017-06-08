import Vue from 'vue'

const isDevMode = process.env.NODE_ENV !== 'production'
Vue.config.devtools = isDevMode

var app = new Vue({
  el: '#app',
  template: '<h2>{{ message }}</h2>',
  data: {
    message: 'Hello Vue!'
  }
})
