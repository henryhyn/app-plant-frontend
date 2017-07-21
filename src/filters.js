import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('fromNow', function (val) {
  return moment(val).fromNow()
})

Vue.filter('format', function (val) {
  return moment(val).format('YYYY-MM-DD HH:MM:SS')
})
