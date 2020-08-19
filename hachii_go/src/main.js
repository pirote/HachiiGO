import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import* as firebase from "firebase";
import '@fortawesome/fontawesome-free/css/all.css'
import liff from '@line/liff';
//initial line LIFF
liff.init({ liffId: "1654665014-qlP8X7Wd" });
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

const firebaseconfig = {
  apiKey: "AIzaSyChIqtEcv7mJAAjoZjuXmuFnZvywMl4Eu4",
  authDomain: "hachiigo-lineapp.firebaseapp.com",
  databaseURL: "https://hachiigo-lineapp.firebaseio.com",
  projectId: "hachiigo-lineapp",
  storageBucket: "hachiigo-lineapp.appspot.com",
  messagingSenderId: "770420685488",
  appId: "1:770420685488:web:8bcc8cec2a0e2e92c1d975",
  measurementId: "G-RLZB8RQFFK"
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