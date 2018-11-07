// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios';
import Vue from 'vue';
import VueRecaptcha from 'vue-recaptcha';
import VueMathjax from 'vue-mathjax';
import VueCodemirror from 'vue-codemirror';
import VueHighlightJS from 'vue-highlightjs';
import Element from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css';
import '@/codemirror.css';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(VueMathjax);
Vue.use(VueHighlightJS);
Vue.use(VueCodemirror);
Vue.use(Element);
Vue.use(VueRecaptcha);

locale.use(lang);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
