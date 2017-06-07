import Vue from 'vue'

var app = new Vue({
  el: '#app',
  template: '<h2>{{ message }}</h2>',
  data: {
    message: 'Hello Vue!'
  }
})
