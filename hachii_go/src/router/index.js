import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home.vue')
const Calories = () => import('@/views/Calories.vue')
import * as firebase from "firebase/app";
import 'firebase/auth'
Vue.use(VueRouter)
 
  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      title:"Home"
    }
  },
  {
    path: '/calories',
    name: 'Calories',
    component: Calories,
    meta: {
      requiresAuth: true,
      title:"Calories"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) next({path:'Login'});
  else if (!requiresAuth && currentUser) next({path:'Home'});
  else next();
});

export default router
