import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Help from '@/pages/Help'
import PlantList from '@/pages/plants/PlantList'
import PlantShow from '@/pages/plants/PlantShow'
import ReDishList from '@/pages/redishes/ReDishList'
import ReDishShow from '@/pages/redishes/ReDishShow'

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
    path: '/redishes/:shopId',
    name: 'ReDishList',
    component: ReDishList
  }, {
    path: '/redishes/dishes/:dishId',
    name: 'ReDishShow',
    component: ReDishShow
  }, {
    path: '/plants',
    name: 'PlantList',
    component: PlantList
  }, {
    path: '/plants/:id',
    name: 'PlantShow',
    component: PlantShow
  }]
})
