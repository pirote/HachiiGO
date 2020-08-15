import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import* as firebase from "firebase";
import '@fortawesome/fontawesome-free/css/all.css'
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

const firebaseconfig = {
  apiKey: "AIzaSyDI1Bx296V40BTX2h2GlGakpDGOcRUxoF0",
  authDomain: "hachiigodb.firebaseapp.com",
  databaseURL: "https://hachiigodb.firebaseio.com",
  projectId: "hachiigodb",
  storageBucket: "hachiigodb.appspot.com",
  messagingSenderId: "397447330792",
  appId: "1:397447330792:web:27010e7def7f2a29ee425d",
  measurementId: "G-XMBG5W463Z"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseconfig);
}



let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  if(!app){
    app = new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app')
  }
  
})