import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { securedAxiosInstance, plainAxiosInstance, imageAxiosInstance } from './server/axios'
import VueAxios from 'vue-axios'
import router from './router/routes'
import Vuex from 'vuex'
import { store } from './store/index'

Vue.config.productionTip = false
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance,
  image: imageAxiosInstance
})
Vue.use(Vuex)

new Vue({
  vuetify,
  store,
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  imageAxiosInstance,
  render: h => h(App)
}).$mount('#app')
