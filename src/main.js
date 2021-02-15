import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import signIn from './components/signIn.vue'
import signUp from './components/signUp.vue'
Vue.use(VueRouter);
const routes=[
  {path: '/signIn',component:signIn},
  {path: '/signUp',component:signUp}
]
const router=new VueRouter(
  {
    routes
  }
)
Vue.config.productionTip = false

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
