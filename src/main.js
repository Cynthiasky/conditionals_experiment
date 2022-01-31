import Vue from 'vue';
import VueKonva from 'vue-konva';
import VueMagpie from 'magpie-base';
import App from './App.vue';
import magpieConfig from './magpie.config.js';

//import Box2D from '../public/lib/Box2dWeb-2.1.a.3.js';
//Vue.prototype.$Box2D = Box2D

Vue.config.productionTip = false;

// Load Konva components
Vue.use(VueKonva, { prefix: 'Canvas' });

// Load magpie components
Vue.use(VueMagpie, magpieConfig);

// start app
new Vue({
  render: (h) => h(App)
}).$mount('#app');
