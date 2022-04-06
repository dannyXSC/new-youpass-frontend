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
//bootstrap
import BootstrapVue from "bootstrap-vue"
//vue hamburger button
import * as VueHamburgerButton from 'vue-hamburger-button'
// latex
import VueKatex from 'vue-katex';

import Default from './layout/Wrappers/baseLayout.vue';
import Pages from './layout/Wrappers/pagesLayout.vue';
import moment from 'moment'
import Croppa from "vue-croppa";
//导入文件

//croppa
Vue.use(Croppa)
Vue.prototype.$moment = moment;//赋值使用
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueToast)
Vue.use(ElementUI)
Vue.use(BootstrapVue);
Vue.use(VueHamburgerButton);
Vue.use(VueKatex)

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

//全局时间过滤器
Vue.filter('formatDate', function(value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
