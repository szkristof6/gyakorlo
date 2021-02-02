import Vue from 'vue';
import VueRouter from 'vue-router';
/* eslint-disable */
import store from '@/store';
/* eslint-enable */
import Login from '../views/Login.vue';
import home from '../views/Home.vue';
import feladat from '../views/Feladat.vue';
import eredmenyek from '../views/Eredmenyek.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: { requiresLogin: true },
  },
  {
    path: '/feladat',
    name: 'feladat',
    component: feladat,
    meta: { requiresLogin: true },
  },
  {
    path: '/eredmenyek',
    name: 'eredmenyek',
    component: eredmenyek,
    meta: { requiresLogin: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)
    && store.state.auth.isLoggedIn === false) {
    next('/');
  } else {
    next();
  }
});

export default router;
