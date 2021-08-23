import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'

import Dashboard from "../views/Dashboard.vue";
import stationRegistring from "../views/stationRegistring.vue";
import TravelManagement from "../views/TravelManagement.vue";
import ExpeditionManagement from "../views/ExpeditionManagement.vue";
import LostObjetManagement from "../views/LostObjetManagement.vue";
import Analytics from "../views/Analytics.vue";

import login from "../views/login.vue";


Vue.use(VueRouter);



const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: ifAuthenticated,

  },
  {
    path: "/stationRegistring",
    name: "stationRegistring",
    component: stationRegistring,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/TravelManagement",
    name: "TravelManagement",
    component: TravelManagement,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/ExpeditionManagement",
    name: "ExpeditionManagement",
    component: ExpeditionManagement,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/LostObjetManagement",
    name: "LostObjetManagement",
    component: LostObjetManagement,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/Analytics",
    name: "Analytics",
    component: Analytics,
    beforeEnter: ifAuthenticated,
  },  
  {
    path: "/login",
    name: "login",
    component: login,
    beforeEnter: ifNotAuthenticated,
    meta: {
      plainLayout: true,
    },
  },

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
