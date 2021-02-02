import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import App from './App.vue';
import router from './router';
import store from './store';

require('./auth');

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content',
  // ...
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
