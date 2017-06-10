import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Help from '@/pages/Help'
import PlantList from '@/pages/plants/PlantList'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/about',
    name: 'About',
    component: About
  }, {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }, {
    path: '/help',
    name: 'Help',
    component: Help
  }, {
    path: '/plants',
    name: 'PlantList',
    component: PlantList
  }]
})
