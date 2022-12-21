import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/reset.css';
import './assets/css/base.css';
import ElementUI from 'element-ui';
import './assets/element-variables.scss';
import moment from 'moment';
import axios from 'axios';
import Animate from 'animate.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as echarts from 'echarts';

Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

Vue.use(ElementUI);
Vue.use(Animate);

window._AMapSecurityConfig = {
  securityJsCode: '983a318cda5172903ec9f16e2a26d9a5',
};

// store.commit('setBaseURL', 'http://120.26.36.21:3000');
store.commit('setBaseURL', 'http://127.0.0.1:3000')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
