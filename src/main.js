import Vue from 'vue'
import App from './App.vue'
//vuex
import store from "@/store"
//Router
import VueRouter from "vue-router";
import router from "@/router"
//Toast
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
//element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueToast)
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
