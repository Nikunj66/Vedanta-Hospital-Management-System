import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueSession from 'vue-session'

Vue.use(VueSession);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}



Vue.config.productionTip = false

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
