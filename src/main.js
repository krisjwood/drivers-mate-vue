import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import VueRouter from 'vue-router'
import Router from '@/router/index'

Vue.config.productionTip = false

Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const router = new VueRouter({
  mode: 'history',
  routes: Router.routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
