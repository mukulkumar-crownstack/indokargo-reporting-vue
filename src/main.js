import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'
import VueMaterial from 'vue-material'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import interceptorsSetup from './interceptors/interceptors.js'

// Import Material an MaterialVue CSS files (order is important)
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import "./assets/scss/material-dashboard.scss";
import 'sweetalert2/dist/sweetalert2.min.css';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// importing the helper

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueMaterial)

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

interceptorsSetup()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
